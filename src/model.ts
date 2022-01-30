export interface Floor {
  _id?: string;
  name: string;
  manager_id: string;
}
export interface Department {
  _id?: number;
  name: string;
  floor_id: string;
  manager_id: string;
}
export interface Room {
  _id?: number;
  name: string;
  department_id: string;
  manager_id: string;
}
export interface SendMessage {
  title: string;
  message: string;
  feedbackLevel: string;
  feedbackType: string;
  uniqueIDs: string[];
}

export interface MSG {
  id?: number;
  title: string;
  msg: string;
  status: string;
  room_id: string;
  department_id: string;
  floor_id: string;
}

export interface Message {
  _id: string;
  title: string;
  message: string;
  feedbackLevel: string;
  feedbackType: string;
  uniqueIDs: string;
  createdDate: string;
  isArchived: boolean;
  isApproved: boolean;
  isRejected: boolean;
  isCompleted: boolean;
  feedbackLocation: {
    department: string[];
    floor: string[];
    room: string[];
  };
  managerContact: [
    { location: string },
    { cardID: string },
    { username: string },
    { phone_number: string }
  ];
  approvedDate: string;
  completedDate: string;
  rejectedDate: string;
  archivedDate: string;
  url: string;
  isOpen: boolean;
}
export interface UpdateMessage {
  note: string;
  feedback_id: string;
}

export interface User {
  _id: string;
  username: string;
  gender: string;
  role: string;
  avatar: string;
  email: string;
  password: string;
  phone: string;
}
