import { DataTypes } from "sequelize";
import { sequalize } from "#pg";

export const UserModel = sequalize.define("Users", { 
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,   
        primaryKey: true   
    },
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate:{
            len: {
                args: [3, 32],
                msg: "Username length exceeded !"
            }
        }
    },
    password: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: "users"
})

export const TodoModel = sequalize.define("Todos", {
    todo_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    todo_body: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate:{
            len: {
                args: [5, 50],
                msg: "Todo body length excedeed !"
            }
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: "user_id"
        },
        allowNull: false
    },
    isImportant: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false   
    }
}, {
    tableName: "todos"

})
// UserModel.sync({force: true});
// TodoModel.sync({force: true});