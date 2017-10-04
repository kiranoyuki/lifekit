USER=lifekit
PASSWD=passwd
DATABASE=lifekit

init:
	npm install

models:
	./node_modules/.bin/sequelize init
	./node_modules/.bin/sequelize-auto -h localhost -p 3306 -e mysql -d ${DATABASE} -u ${USER} -x ${PASSWD}
	rmdir seeders migrations

clean:
	rm -rf node_modules

