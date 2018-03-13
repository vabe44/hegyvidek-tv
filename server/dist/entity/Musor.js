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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Epizod_1 = require("./Epizod");
let Musor = class Musor extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Musor.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Musor.prototype, "cim", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Musor.prototype, "url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Musor.prototype, "statusz", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Musor.prototype, "kep", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Musor.prototype, "leiras", void 0);
__decorate([
    typeorm_1.OneToMany(type => Epizod_1.Epizod, epizod => epizod.musor) // note: we will create author property in the Photo class below
    ,
    __metadata("design:type", Array)
], Musor.prototype, "epizodok", void 0);
Musor = __decorate([
    typeorm_1.Entity()
], Musor);
exports.Musor = Musor;
//# sourceMappingURL=Musor.js.map