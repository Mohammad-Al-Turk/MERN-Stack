// استيراد المكتبات
const express = require("express");
const { faker } = require("@faker-js/faker");

// إعداد السيرفر
const app = express();
const PORT = 8000;

// إنشاء دالة لإنشاء مستخدم جديد
const createUser = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.number(),
  };
};

// إنشاء دالة لإنشاء شركة جديدة
const createCompany = () => {
  return {
    name: faker.company.name(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
  };
};

// إنشاء Route لإرجاع مستخدم جديد
app.get("/api/users/new", (req, res) => {
  const newUser = createUser();
  res.json(newUser);
});

// إنشاء Route لإرجاع شركة جديدة
app.get("/api/companies/new", (req, res) => {
  const newCompany = createCompany();
  res.json(newCompany);
});

// إنشاء Route لإرجاع مستخدم وشركة جديدة
app.get("/api/user/company", (req, res) => {
  const newUser = createUser();
  const newCompany = createCompany();
  res.json({ user: newUser, company: newCompany });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
