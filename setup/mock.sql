insert into projects(project_name, project_photo, project_link) values
('1 project', 'img', 'http://name'),
('2 project', 'img', 'http://name'),
('3 project', 'img', 'http://name'),
('4 project', 'img', 'http://name')
;

insert into users (username, password, role) values ('admin', crypt('1234', gen_salt('bf')), 1);