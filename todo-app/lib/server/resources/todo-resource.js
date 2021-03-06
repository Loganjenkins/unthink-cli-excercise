"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const resource_base_1 = require("./resource-base");
const resource_decorator_1 = require("resource-decorator");
const todo_model_1 = require("../models/todo-model");
const _allTodos = [
    new todo_model_1.TodoModel({
        id: 0,
        title: 'The first one!',
        completed: true,
        dateCreated: new Date('2020-01-21')
    }),
    new todo_model_1.TodoModel({
        id: 1,
        title: 'SECOND one!',
        completed: false,
        dateCreated: new Date('2020-02-11')
    })
];
let TodoResource = class TodoResource extends resource_base_1.ResourceBase {
    async todoPage() {
        return new resource_decorator_1.TemplateResponse('todo.html');
    }
    async getTodos() {
        return new resource_decorator_1.ApiResponse(_allTodos);
    }
    async createTodo(model) {
        let id = 0;
        const lastTodo = _allTodos[_allTodos.length - 1];
        if (lastTodo !== null && lastTodo.id !== null) {
            id = lastTodo.id + 1;
        }
        const result = new todo_model_1.TodoModel({
            id: id,
            title: model.title,
            completed: model.completed,
            dateCreated: new Date()
        });
        _allTodos.push(result);
        return new resource_decorator_1.ApiResponse(_allTodos);
    }
    async editTodo(model) {
        let foundId = false;
        for (let i = 0; i < _allTodos.length; i++) {
            if (_allTodos[i].id === model.id) {
                _allTodos[i].title = model.title;
                _allTodos[i].completed = model.completed;
                foundId = true;
            }
        }
        if (!foundId) {
            throw new resource_decorator_1.ResourceError(`Toto with ID ${model.id} does not exist.`);
        }
        return new resource_decorator_1.ApiResponse(_allTodos);
    }
    async deleteTodo(model) {
        let foundId = false;
        for (let i = _allTodos.length; i--; i < 0) {
            if (_allTodos[i].id === model.id) {
                _allTodos.splice(i, 1);
                foundId = true;
            }
        }
        if (!foundId) {
            throw new resource_decorator_1.ResourceError(`Toto with ID ${model.id} does not exist.`);
        }
        return new resource_decorator_1.ApiResponse(_allTodos);
    }
};
__decorate([
    resource_decorator_1.template(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "todoPage", null);
__decorate([
    resource_decorator_1.get({
        path: '/api/todo'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "getTodos", null);
__decorate([
    resource_decorator_1.post({
        path: '/api/add-todo'
    }),
    __param(0, resource_decorator_1.body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_model_1.TodoModel]),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "createTodo", null);
__decorate([
    resource_decorator_1.put({
        path: '/api/update-todo'
    }),
    __param(0, resource_decorator_1.body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_model_1.TodoModel]),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "editTodo", null);
__decorate([
    resource_decorator_1.del({
        path: '/api/delete-todo'
    }),
    __param(0, resource_decorator_1.body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_model_1.TodoModel]),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "deleteTodo", null);
TodoResource = __decorate([
    resource_decorator_1.resource({
        basePath: '',
    })
], TodoResource);
exports.TodoResource = TodoResource;
//# sourceMappingURL=todo-resource.js.map