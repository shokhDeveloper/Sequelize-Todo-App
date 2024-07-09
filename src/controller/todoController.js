import { TodoModel } from "#model";
import { ClientError, globalError } from "#utils/error.js"
import { createValidator, todoValidator } from "#utils/validator.js";

export class TodoController {
    constructor(){
        this.GET = async function(_, res){
            try{
                const todos = await TodoModel.findAll();
                return res.status(200).json(todos)
            }catch(error){
                return globalError(res, error);
            }
        },
        this.POST = async function(req, res){
            try{
                const newTodo = req.body;
                if(todoValidator.validate(newTodo).error instanceof Error) throw new ClientError(400, todoValidator.validate(newTodo).error.message);
                if(newTodo.user_id && newTodo.user_id !== req.user.user_id) throw new ClientError(400, `Your token id is not ${newTodo.user_id}`)
                const todo = {
                    ...newTodo,
                    user_id: req.user.user_id
                };
                if(!todo.isImportant) todo.isImportant = false;
                const response = await TodoModel.create({todo_body: todo.todo_body, user_id: todo.user_id, isImportant: todo.isImportant}, {returning: true});
                if(!response.todo_id) throw new ClientError(400, "An error occurred while writing the todo to the database !");
                return res.status(201).json({message: "New todo successfully created !", status: 201, todo: response}); 
            }catch(error){
                return globalError(res, error);
            }
        }
        this.PUT = async function(req, res){
            try{
                const {todoId} = req.params;
                const update_todo_id= +(todoId || req.body.todo_id);
                const validator = createValidator(Object.keys(req.body));
                if(validator.validate(req.body).error instanceof Error) throw new ClientError(400, validator.validate(req.body).error.message);
                const todo = req.parse(await TodoModel.findOne({where:{todo_id:update_todo_id}}));
                if(!todo) throw new ClientError(404, "Todo not found !");
                const updateTodo = await TodoModel.update({todo_body: req.body.todo_body ? req.body.todo_body: todo.todo_body,isImportant: req.body.isImportant ? req.body.isImportant: false}, {where: {todo_id: update_todo_id}, returning: true,plain: true});
                const parse = req.parse(updateTodo[1]);
                if(!parse.todo_id) throw new ClientError(400, "There was an error updating the todo ! ");
                return res.status(200).json({message: "Todo successfully updated !", status: 200, todo: parse});
            }catch(error){
                console.log(error)
                return globalError(res, error);
            }
        }
        this.DELETE = async function(req, res){
            try{
                const {todoId} = req.params;
                const delete_todo_id = +(todoId || req.body.todo_id);
                const deleteTodo = await TodoModel.destroy({where:{todo_id: delete_todo_id}});
                if(!deleteTodo) throw new ClientError(400, "There was an error deleting the todo !");
                return res.status(200).json({message: "The todo deleted successfully", status: 200})
            }catch(error){
                return globalError(res, error);
            }
        }
    }
}