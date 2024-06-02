import axiosInstance from "../axiosSetup";

const groupAPI = {
  getGroups: () => {
    return axiosInstance.get("/groups");
  },
  getGroupById: (id) => {
    return axiosInstance.get(`/groups/${id}`);
  },
  createGroup: (data) => {
    return axiosInstance.post('/groups', data);
  },
  joinGroup: (groupId) => {
    return axiosInstance.post(`/groups/${groupId}/join`);
  },
  approveMember: (groupId, userId) => {
    return axiosInstance.post(`/groups/${groupId}/approve/${userId}`);
  },
  rejectMember: (groupId, userId) => {
    return axiosInstance.post(`/groups/${groupId}/reject/${userId}`);
  },
  leaveGroup: (groupId) => {
    return axiosInstance.post(`/groups/${groupId}/leave`);
  },
};
export default groupAPI;
