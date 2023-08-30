INSERT INTO department (name)
 VALUES 
 ("Coprate"),
 ("Sales"),
 ("Accounting"),
 ("Office Admin"),
 ("Quality Control")
 


INSERT INTO Role (job_title,salary,dep_id)
VALUES
  ('VP', 120000, 1),
  ('Branch Manager', 100000, 1),
  ('Sales', 75000, 2),
  ('Accountant',65000,3),
  ('Office Admin', 55000, 4),
  ('Qualilty Assurance Coordinator', 50000, 5);


INSERT INTO employee (emp_id,first_name,last_name,job_title,role_id,dep_id,salary,super_id)
VALUES
  (1,'Jan', 'Levinson', 'VP', 1,1, 120000, NULL),
  (2,'Michale', 'Scott','Branch Manager', 2,1, 100000, 1),

  (3,'Jim', 'Halpart', 'Sales', 3,2,75000, 2),
  (4,'Dwight', 'Schrute','Sales', 3,2,75000, 2),
  (5,'Phyills', 'Vance','Sales', 3,2,75000, 2),
  (6,'Stanley', 'Hudson','Sales', 3,2,75000, 2),

  (7,'Angela', 'Martin','Accountant',4 ,3,65000, 2);
  (8,'Oscar', 'Martinez','Accountant',4 ,3,65000, 2);
  (9,'Kevin', 'Malone','Accountant',4 ,3,65000, 2);

 (10,'Pam', 'Beasly','Office Admin',5 ,3,55000, 2);
  
 (11,'Creed', 'Baratton','Qualilty Assurance Coordinator',6 ,3,50000, 2);