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
// tslint:disable-next-line:max-line-length
const typeorm_1 = require("typeorm");
const Musor_1 = require("./Musor");
let Musorujsag = class Musorujsag extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Musorujsag.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Musor_1.Musor, musor => musor.epizodok, {
        eager: true,
    }),
    __metadata("design:type", Musor_1.Musor)
], Musorujsag.prototype, "musor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Musorujsag.prototype, "sorrend", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Musorujsag.prototype, "adascim", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Musorujsag.prototype, "link", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Musorujsag.prototype, "nap", void 0);
__decorate([
    typeorm_1.Column("time"),
    __metadata("design:type", Date)
], Musorujsag.prototype, "aktivEttol", void 0);
__decorate([
    typeorm_1.Column("time"),
    __metadata("design:type", Date)
], Musorujsag.prototype, "aktivEddig", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Musorujsag.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Musorujsag.prototype, "updatedDate", void 0);
Musorujsag = __decorate([
    typeorm_1.Entity()
], Musorujsag);
exports.Musorujsag = Musorujsag;
//# sourceMappingURL=Musorujsag.js.map