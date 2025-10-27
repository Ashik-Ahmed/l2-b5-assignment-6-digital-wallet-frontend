import AdminCardSection from '@/components/modules/adminDashboard/AdminCardSection'
import { AdminDataTable } from '@/components/modules/adminDashboard/AdminDataTable';
import { useGetAllTransactionsByAdminQuery } from '@/redux/features/admin/admin.api';

const AdminDashboard = () => {
    // const today = new Date().toISOString().split('T')[0];
    const { data: transactions } = useGetAllTransactionsByAdminQuery(undefined);
    return (
        <div>
            <AdminCardSection transactions={transactions?.data} />
            <AdminDataTable transactions={transactions?.data} />
        </div>
    )
}

export default AdminDashboard