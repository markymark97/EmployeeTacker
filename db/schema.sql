
DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;



CREATE TABLE department (
    id INT PRIMARY KEY Auto_INCREMENT,
    name VARCHAR(40)
);


CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_title VARCHAR(40),
  salary INT,
  dep_id INT,
  FOREIGN KEY (dep_id) REFERENCES department (id)
);

CREATE TABLE employee (
  emp_id INT  PRIMARY KEY AUTO_INCREMENT ,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  job_title VARCHAR(40),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  dep_id INT,
  FOREIGN KEY (dep_id) REFERENCES department(id),
  salary INT,
  super_id INT,
  FOREIGN KEY (super_id) REFERENCES employee(emp_id)
);

