export type Employee = {
	id: number;
	firstName: String;
	middleName?: String;
	lastName: String;
	gender: String;
	email: String;
	phone: String;
	position: String;
	department: String;
	directSupervisors: number[];
	directReports: number[];
	createdAt: string;
	updatedAt: string;
	isDeleted: boolean;
};
