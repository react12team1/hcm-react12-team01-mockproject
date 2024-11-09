import { useState, useEffect, useRef } from "react";
import { Table, Button, Popover, Spin, Modal, Input, Form, Radio } from "antd";
import { GetCourseResponsePageData } from "../../../model/admin/response/Course.response";
import { GetCourseRequest } from "../../../model/admin/request/Course.request";
import { CourseService } from "../../../services/CourseService/course.service";
import { CourseStatusEnum } from "../../../model/Course";
import { toast } from "react-toastify";

const TableCoursesPending = () => {
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>([]);
  const [searchQuery] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<GetCourseResponsePageData | null>(null);
  const [status, setStatus] = useState<CourseStatusEnum>(CourseStatusEnum.WaitingApprove);
  const [comment, setComment] = useState<string>('');

  const hasMounted = useRef(false);

  const fetchCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch courses:", error);
    }
  };

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    const fetchCoursesData = async () => {
      try {
        setLoading(true);
        const searchCondition = {
          keyword: searchQuery,
          category_id: "",
          status: CourseStatusEnum.WaitingApprove,
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
          setLoading(false);
          const data = response.data.pageData;
          setCoursesData(data);
          setIsDataEmpty(data.length === 0);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoursesData();
  }, [searchQuery]);
  
  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleChangeStatus = (course: GetCourseResponsePageData) => {
  setSelectedCourse(course);
  setIsModalVisible(true);
};

const handleOk = async () => {
  if (!selectedCourse) return;

  try {
    setLoading(true);

    const response = await CourseService.changeStatusCourse({
      course_id: selectedCourse._id,
      new_status: status,
      comment: comment,
    });
    if (response && response.data && response.data.success) {
      console.log("Course status updated successfully:", response.data);
      if (status === CourseStatusEnum.Approved) {
        toast.success(`Course status changed to Approved successfully!`);
      } else if (status === CourseStatusEnum.Rejected) {
        toast.error(`Course status changed to Rejected. Comment: ${comment}`);
      }

      const searchCondition = {
        keyword: searchQuery,
        category_id: "",
        status: CourseStatusEnum.WaitingApprove,
        is_delete: false,
      };

      const courseResponse = await fetchCourse({
        searchCondition,
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });

      if (courseResponse && courseResponse.success) {
        const data = courseResponse.data.pageData;
        setCoursesData(data);
        setIsDataEmpty(data.length === 0);
      }

      setIsModalVisible(false);
      setStatus(CourseStatusEnum.WaitingApprove);
      setComment("");
    } else {
      console.error("Failed to update course status:", response.data);
      toast.error('Failed to change course status!');
    }
  } catch (error) {
    console.error("Error changing course status:", error);
    toast.error('An error occurred while changing course status!');
  } finally {
    setLoading(false);
  }
};

const handleCancel = () => {
  setIsModalVisible(false);
  setStatus(CourseStatusEnum.WaitingApprove);
  setComment(""); 
};

if (loading) return <Spin tip="Loading course details..." />;

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
      render: (status: CourseStatusEnum) => {
        let statusText = "";
        let statusColor = "";
        let borderColor = "";
        let popoverContent = "";

        switch (status) {
          case CourseStatusEnum.WaitingApprove:
            statusText = "Waiting for Approval";
            statusColor = "text-orange-300";
            borderColor = "border-orange-300";
            popoverContent = "Please waiting for the approval from admin";

            break;
          default:
            statusText = "Unknown";
            statusColor = "text-gray-500";
            borderColor = "border-gray-500";
            popoverContent = "NO CAP!";

            break;
        }
        return (
          <Popover content={popoverContent}>
            <span
              className={`font-semibold ${statusColor} border-2 ${borderColor} px-2 py-1 rounded-md`}
            >
              {statusText}
            </span>
          </Popover>
        );
      },
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
      title: "Session Count",
      dataIndex: "session_count",
      key: "session_count",
      render: (session_count: number) => `${session_count}`,
    },
    {
      title: "Lesson Count",
      dataIndex: "lesson_count",
      key: "lesson_count",
      render: (lesson_count: number) => `${lesson_count}`,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "actions",
      render: (_: unknown, record: GetCourseResponsePageData) => (
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => handleChangeStatus(record)}
        >
          Change Status
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full">
      {isDataEmpty ? (
        <div className="text-center text-red-500">No courses found.</div>
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

<Modal
  title="Change Course Status"
  visible={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
  okText="Confirm"
  cancelText="Cancel"
>
  <Form>
    <Form.Item label="Status">
      <Radio.Group
        value={status}
        onChange={(e) => setStatus(e.target.value as CourseStatusEnum)}
      >
        <Radio value={CourseStatusEnum.Approved}>Approve</Radio>
        <Radio value={CourseStatusEnum.Rejected}>Reject</Radio>
      </Radio.Group>
    </Form.Item>

    {status === CourseStatusEnum.Rejected && (
      <Form.Item label="Reason for rejection ">
        <Input.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please provide a reason"
        />
      </Form.Item>
    )}
  </Form>
</Modal>

    </div>
  );
};

export default TableCoursesPending;
