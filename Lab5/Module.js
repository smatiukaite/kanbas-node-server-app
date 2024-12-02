const module = {
    id: "RS101",
    name: "Rocket Propulsion",
    number: "RS4550",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    department: "D123",
    credits: 4,
    picture: "pic19.jpg",
    description: "This course provides an in-depth study of the fundamentals of rocket propulsion, covering topics such as propulsion theory, engine types, fuel chemistry, and the practical applications of rocket technology. Designed for students with a strong background in physics and engineering, the course includes both theoretical instruction and hands-on laboratory work"
};
export default function Module(app) {
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });
};