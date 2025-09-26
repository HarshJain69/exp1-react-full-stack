// Sample employee data for demonstration
export const sampleEmployees = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    position: "Senior Software Engineer",
    phone: "+1 (555) 123-4567",
    salary: "95000",
    dateAdded: new Date("2024-01-15").toISOString(),
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    phone: "+1 (555) 234-5678",
    salary: "78000",
    dateAdded: new Date("2024-02-20").toISOString(),
  },
  {
    id: "EMP003",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    department: "Sales",
    position: "Sales Representative",
    phone: "+1 (555) 345-6789",
    salary: "65000",
    dateAdded: new Date("2024-03-10").toISOString(),
  },
  {
    id: "EMP004",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    department: "Human Resources",
    position: "HR Specialist",
    phone: "+1 (555) 456-7890",
    salary: "72000",
    dateAdded: new Date("2024-01-25").toISOString(),
  },
  {
    id: "EMP005",
    name: "David Brown",
    email: "david.brown@company.com",
    department: "Finance",
    position: "Financial Analyst",
    phone: "+1 (555) 567-8901",
    salary: "68000",
    dateAdded: new Date("2024-03-05").toISOString(),
  },
  {
    id: "EMP006",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    department: "Engineering",
    position: "Frontend Developer",
    phone: "+1 (555) 678-9012",
    salary: "82000",
    dateAdded: new Date("2024-02-28").toISOString(),
  },
  {
    id: "EMP007",
    name: "Alex Garcia",
    email: "alex.garcia@company.com",
    department: "Operations",
    position: "Operations Manager",
    phone: "+1 (555) 789-0123",
    salary: "85000",
    dateAdded: new Date("2024-01-08").toISOString(),
  },
];

// Function to load sample data (can be used for demo purposes)
export const loadSampleData = () => {
  const existingData = localStorage.getItem("employees");
  if (!existingData || JSON.parse(existingData).length === 0) {
    localStorage.setItem("employees", JSON.stringify(sampleEmployees));
    return sampleEmployees;
  }
  return JSON.parse(existingData);
};
