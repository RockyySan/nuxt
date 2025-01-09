import { defineStore } from 'pinia'
import CategoryService from '~/services/CategoryService.js'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref({})
  const categoryService = CategoryService.getInstance()

  const getCategories = async (params) => {
    try {
      const { data } = await categoryService.getCategory(params)
      categories.value = categories
      console.log(data)
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const showCategory = async (slug,param) => {
    try {
      const { data } = await categoryService.showCategory(slug, param)
      categories.value = data
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Get category failed')
      throw new Error(`Get category failed: ${error.message || 'Unknown error'}`)
    }
  }

  return {
    categories: computed(() => categories.value),
    getCategories,
    showCategory
  }
})
