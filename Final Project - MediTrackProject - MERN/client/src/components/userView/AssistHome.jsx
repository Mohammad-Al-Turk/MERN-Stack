import {Card} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import { Typography } from "antd";


const AssistHome = () => {
    const {Title, Text} = Typography;


    return (
        <Card className="dashboard-card" title={<Title level={4}><HomeOutlined/> Latest Updates</Title>}>
            <Text>View and update patient medical history.</Text>
        </Card>
    )
}
export default AssistHome;