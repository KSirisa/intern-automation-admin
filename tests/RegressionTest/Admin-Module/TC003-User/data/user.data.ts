import path from "path";

export const testData = {
  url: "/admin#/user",




  generalInfo: {
    imagePath: path.resolve(process.cwd(), "tests/Admin-Module/TC003-User/image/driverImage.jpg"),
    username: "AT00001",
    title: "",
    firstName: "AT",
    lastName: "Test",
    email: "email@email.com",
    phone: "0123456789",  
    authType: "Form",
    userType: "Public",
    enabled: "No",
  },

  businessUnit: {
    treeNode: "Head Office",
    groups: [
      "Account",
      "FMS Dashboard",
      "IT View Only",
    ],
    expirationDay: "28",
    roles: ["Transporter"],
    shiftName: "",
  },

  driver: {
    employeeId: "AT01197",
    nationalId: "0119701197",
    gender: "Female (2)",
    minRestTime: "20",
    adrDesc: "Automate Test",
    trainer: "Trainer1 New",
    cardType: "Smart Card (1)",
    cardId: "10000",
    licenseType: "สำนักงานขนส่งกรุงเทพมหานครพื้นที่ 5",
    licenseClass: "Private Bus and Truck Class 1",
    country: "Thailand",
    province: "BANGKOK",
    passportNo: "12345",
    adrNo: "1234",
    certificateName: "2",
  },

  mobileServices: {
    stopDuration: "300",
    overSpeedDelay: "60",
  },

  productCategories: {
    groupFilter: "test",
  },
};