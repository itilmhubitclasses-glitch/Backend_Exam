const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(express.json());
app.use(cors());

async function connectToDB() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}
connectToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});

// Routes
const { roles } = require("./routes/roleRoute");
const { stuff } = require("./routes/stuffRoute");
const { stuff_role } = require("./routes/stuff_roleRoute");
const { stages } = require("./routes/stageRoute");
const {branch} = require("./routes/branchRoute")
const {group} = require("./routes/groupRoute")
const {group_stuff} = require("./routes/group_stuffRoute")
const {lesson} = require("./routes/lessonRoute")
const {lid_status} = require("./routes/lid_statusRoute")
const {reason_lid} = require("./routes/reason_lidRoute")
const {lid} = require("./routes/lidRoute")
const {students} = require("./routes/studentsRoute")
const {student_group} = require("./routes/student_groupRoute")
const {studentLesson14} = require("./routes/studentLesson14Route")
const {payment} = require("./routes/paymentRoute")
app.use("/roles", roles);
app.use("/stuff", stuff);
app.use("/stuff_role", stuff_role);
app.use("/stages", stages);
app.use("/branch", branch);
app.use("/group", group);
app.use("/group_stuff",group_stuff );
app.use("/lesson",lesson );
app.use("/lid_status", lid_status); 
app.use("/reason_lid", reason_lid); 
app.use("/lid", lid);
app.use("/students", students);
app.use("/student_group", student_group);
app.use("/studentLesson14", studentLesson14);
app.use("/payment", payment);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API Documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
