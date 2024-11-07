import { useState, useEffect, useRef } from "react";
import { Table, Button, Switch, message } from "antd";
import { CourseStatusEnum } from "../../../../../model/Course";
import { useNavigate } from "react-router-dom";
import { CourseService } from "../../../../../services/CourseService/course.service";
import { GetCourseRequest } from "../../../../../model/admin/request/Course.request";
import { EyeOutlined } from "@ant-design/icons";
import { GetCourseResponsePageData } from "../../../../../model/admin/response/Course.response";
import { SendOutlined } from '@ant-design/icons';

interface Course {
  _id: string;
  name: string;
  session: string;
  category_name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

const CourseTable = () => {
  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>([]);
  const [searchQuery] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);  // state để kiểm tra dữ liệu có rỗng hay không
  const hasMounted = useRef(false);

  const fetchCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    const fetchCoursesData = async () => {
      try {
        const searchCondition = {
          keyword: searchQuery,
          category_id: "",
          status: undefined,
          is_delete: false,
        };

        const response = await fetchCourse({
          searchCondition,
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        });

        if (response && response.success) {
          const data = response.data.pageData;
          setCoursesData(data);
          setIsDataEmpty(data.length === 0); // Check if data is empty
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCoursesData();
  }, [searchQuery]);

  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (courseId: string) => {
    navigate(`/instructor/manage-course/view-detail-course/${courseId}`);
  };

  const onChangeStatus = (id: string, status: CourseStatusEnum) => {
    console.log(`Changing status for course ${id} to ${status}`);
    // Implement status update logic here
  };

  const handleSendClick = async (courseId: string) => {
    try {
      // Gọi API để thay đổi trạng thái khóa học
      await CourseService.changeStatusCourse({
        course_id: courseId,
        new_status: CourseStatusEnum.WaitingApprove, // Đặt trạng thái là "waiting_approve"
        comment: "Thay đổi trạng thái khóa học"
      });

      // Cập nhật lại trạng thái khóa học trong bảng chỉ cho khóa học được nhấn
      setCoursesData((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? { ...course, status: CourseStatusEnum.WaitingApprove }
            : course
        )
      );

      // Hiển thị thông báo thành công
      message.success("Course status updated to Waiting Approve!");
    } catch (error) {
      message.error("Failed to update course status!");
      console.error("Error changing status:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
    {
      title: "Change Status",
      key: "changeStatus",
      render: (_: unknown, record: GetCourseResponsePageData) => (
        <Switch
          checked={record.status === CourseStatusEnum.Active}
          onChange={(checked) =>
            onChangeStatus(
              record._id,
              checked ? CourseStatusEnum.Active : CourseStatusEnum.Inactive
            )
          }
          className="bg-blue-500"
        />
      ),
    },
    {
      title: "Action",
      key: "actions",
      render: (_: unknown, record: GetCourseResponsePageData) => (
        <div className="flex space-x-2">
          {/* View Details Button */}
          <Button
            onClick={() => handleViewDetails(record._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <EyeOutlined />
          </Button>

          {/* Send Button */}
          <Button
            icon={<SendOutlined />} // Using the Send icon
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => handleSendClick(record._id)} // Call the API when clicked
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Hiển thị thông báo nếu không có dữ liệu */}
      {isDataEmpty ? (
        <div className="text-center text-red-500">
          No courses found.
        </div>
      ) : (
        <Table<GetCourseResponsePageData>
          columns={columns}
          dataSource={filteredCourses}
          rowKey="_id"
          className="w-full shadow-md rounded-lg overflow-hidden"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} courses`,
          }}
        />
      )}
    </div>
  );
};

export default CourseTable;
