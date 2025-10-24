import CardSection from "@/components/modules/dashboard/CardSection"
import { DataTableDemo } from "@/components/modules/dashboard/DataTable"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useNavigate } from "react-router";


const UserDashboard = () => {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data?.data?.email && data?.data?.role !== "user") {
        navigate("/login");
    }

    return (
        <div>
            <CardSection />
            <DataTableDemo />
        </div>
    )
}

export default UserDashboard