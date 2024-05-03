package model

import (
	"time"
	"gorm.io/gorm"
)

type Workspace struct {
	gorm.Model
	Name      string
	UserID    uint `gorm:"foreignKey:UserID"`
	Status    string `gorm:"type:string;not null;default:'active'"`
	CreatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
