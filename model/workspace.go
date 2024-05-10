package model

type Workspace struct {
	Model
	Name   string `gorm:"index;not null;size:255;" json:"name"`
	UserID uint   `gorm:"foreignKey:UserID" json:"user_id"`
	Status string `gorm:"not null;default:'active'" json:"status"`
}
