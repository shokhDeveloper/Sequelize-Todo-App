import sq from "sequelize";

const {Sequelize} = sq;

export const sequalize = new Sequelize({
    database: "todos",
    host: "localhost",
    password: "82850406m",
    username: "postgres",
    port: "5432",
    dialect: "postgres"
});

;(async () => {
    try{
        await sequalize.authenticate();
        console.log("Database successfully connected !");
    }catch(error){
        console.log("Database not connected !", error.message)
    }
})();
