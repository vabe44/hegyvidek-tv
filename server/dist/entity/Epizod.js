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
let Epizod = class Epizod extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Epizod.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Epizod.prototype, "cim", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Epizod.prototype, "url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Epizod.prototype, "statusz", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Epizod.prototype, "kiemelt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Epizod.prototype, "kulcsszavak", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Epizod.prototype, "datum", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Epizod.prototype, "musor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Epizod.prototype, "kep", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Epizod.prototype, "youtube", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Epizod.prototype, "reszletesLeiras", void 0);
Epizod = __decorate([
    typeorm_1.Entity()
], Epizod);
exports.Epizod = Epizod;
//# sourceMappingURL=Epizod.js.map