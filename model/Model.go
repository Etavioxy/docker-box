package model

import "gorm.io/gorm"

type Model struct {
	gorm.Model
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt int64          `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt int64          `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}
