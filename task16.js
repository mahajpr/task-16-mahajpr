let students = [];
    const addStudent = () => {
        try {
            let name = document.getElementById("name").value;
            let age = document.getElementById("age").value;
            let dept = document.getElementById("dept").value;

            if (!name || !age || !dept) {
                throw new Error("All fields are required");
            }

            let student = {
                name: name,
                age: age,
                department: dept
            };
            

            students.push(student);

            displayStudents();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("dept").value = "";
        }
        catch(error) {
            alert(error.message);
        }
    };

    const displayStudents = () => {
        let output = "";

        students.forEach((student, index) => {
            output += `
                <div class="student">
                    <strong>${student.name}</strong><br>
                    Age: ${student.age}<br>
                    Department: ${student.department}<br>
                    <button onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </div>
            `;
        });

        document.getElementById("studentList").innerHTML = output;

        document.getElementById("jsonData").textContent =
            JSON.stringify(students, null, 2);
    };
    const deleteStudent = (index) => {
        students.splice(index, 1);
        displayStudents();
    };
    const searchStudent = () => {
        let search =
            document.getElementById("search").value.toLowerCase();

        let result = students.filter(student =>
            student.name.toLowerCase().includes(search)
        );

        let output = "";

        result.forEach(student => {
            output += `
                <div class="student">
                    <strong>${student.name}</strong><br>
                    Age: ${student.age}<br>
                    Department: ${student.department}
                </div>
            `;
        });

        document.getElementById("studentList").innerHTML =
            output || "<p>No student found</p>";
    };
    function saveStudentsPromise() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Students Saved Successfully");
            }, 2000);
        });
    }

    async function saveData() {
        try {
            let message = await saveStudentsPromise();
            document.getElementById("result").innerText = message;
        }
        catch(error) {
            document.getElementById("result").innerText = error.message;
        }
    }

    async function loadData() {
        try {
            document.getElementById("result").innerText =
                "Loading Students...";

            await new Promise(resolve =>
                setTimeout(resolve, 2000)
            );

            document.getElementById("result").innerText =
                "Students Loaded Successfully";
        }
        catch(error) {
            document.getElementById("result").innerText =
                error.message;
        }
    }