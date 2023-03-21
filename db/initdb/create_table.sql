DROP TABLE IF EXISTS `richmenus`;

CREATE TABLE richmenus (
  `id` INT NOT NULL AUTO_INCREMENT,
  `richmenu_id` VARCHAR(60) NOT NULL UNIQUE,
  `d_richmenu` TINYINT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO richmenus (richmenu_id, d_richmenu) VALUES ('richmenu-149d8ed484569620c1aca7996ef8b0c0', 0);
INSERT INTO richmenus (richmenu_id, d_richmenu) VALUES ('richmenu-e4753fd6effe7a055b4997d2c734940b', 0);
INSERT INTO richmenus (richmenu_id, d_richmenu) VALUES ('richmenu-6c429e7b309fbfedc3064402c3f30069', 0);
INSERT INTO richmenus (richmenu_id, d_richmenu) VALUES ('richmenu-dff25a1f9bd3399fba51fe129ef3f0fd', 0);
INSERT INTO richmenus (richmenu_id, d_richmenu) VALUES ('richmenu-ec761c1af77276cf69e95aa30b9341f5', 0);
INSERT INTO richmenus (richmenu_id, d_richmenu) VALUES ('richmenu-eeea720bd999c27cdfd990e7cbcf4c08', 1);

