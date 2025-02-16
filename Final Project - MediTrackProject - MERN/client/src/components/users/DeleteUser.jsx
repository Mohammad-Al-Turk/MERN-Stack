import axios from "axios";



const handleDelete = (user) => {  // Receive the whole user object
        Modal.confirm({
            title: 'Confirm Delete',
            content: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => { // Async function for the OK action
                try {
                    await axios.delete(`http://localhost:8000/api/user/${user._id}`, { withCredentials: true });
                    message.success('User deleted successfully');
                    setUsers(users.filter(u => u._id !== user._id)); // Remove from the list
                } catch (error) {
                    console.error("Delete Error:", error);
                    message.error('Error deleting user');
                }
            },
        });
    };






export const DeleteUser = () => {



    return (
        <div>
            <h1>Delete User</h1>
        </div>
    )
}

;