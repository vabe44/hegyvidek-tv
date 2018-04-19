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
let Banner = class Banner extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Banner.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Banner.prototype, "nev", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Banner.prototype, "aktivEttol", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Banner.prototype, "aktivEddig", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Banner.prototype, "statusz", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Banner.prototype, "tipus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Banner.prototype, "kep", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Banner.prototype, "keplink", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Banner.prototype, "embedkod", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Banner.prototype, "pozicio", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Banner.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Banner.prototype, "updatedDate", void 0);
Banner = __decorate([
    typeorm_1.Entity()
], Banner);
exports.Banner = Banner;
//# sourceMappingURL=Banner.js.map