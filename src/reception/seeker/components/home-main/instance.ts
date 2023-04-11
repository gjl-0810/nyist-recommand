import REGION_DATA from './data.json'
import { cloneDeep } from 'lodash-es'
interface CascaderOption extends Record<string, unknown> {
  label?: string
  value?: string | number
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
}
// code转汉字大对象
const CodeToText:any = {}
// 汉字转code大对象
const TextToCode:any = {}
const RegionData:any = REGION_DATA
const provinceObject:any = RegionData['86'] // 省份对象
const regionData:any = []
let provinceAndCityData:CascaderOption[] = []

CodeToText[''] = '全部'

// 计算省
for (const prop in provinceObject) {
  regionData.push({
    value: prop, // 省份code值
    label: provinceObject[prop] // 省份汉字
  })
  CodeToText[prop] = provinceObject[prop]
  TextToCode[provinceObject[prop]] = {
    code: prop
  }
  TextToCode[provinceObject[prop]]['全部'] = {
    code: ''
  }
}
// 计算市
for (let i = 0, len = regionData.length; i < len; i++) {
  const provinceCode = regionData[i].value
  const provinceText = regionData[i].label
  const provinceChildren = []
  for (const prop in RegionData[provinceCode]) {
    provinceChildren.push({
      value: prop,
      label: RegionData[provinceCode][prop]
    })
    CodeToText[prop] = RegionData[provinceCode][prop]
    TextToCode[provinceText][RegionData[provinceCode][prop]] = {
      code: prop
    }
    TextToCode[provinceText][RegionData[provinceCode][prop]]['全部'] = {
      code: ''
    }
  }
  if (provinceChildren.length) {
    regionData[i].children = provinceChildren
  }
}
provinceAndCityData = cloneDeep(regionData)

// 计算区
for (let i = 0, len = regionData.length; i < len; i++) {
  const province = regionData[i].children
  const provinceText = regionData[i].label
  if (province) {
    for (let j = 0, len = province.length; j < len; j++) {
      const cityCode = province[j].value
      const cityText = province[j].label
      const cityChildren = []
      for (const prop in RegionData[cityCode]) {
        cityChildren.push({
          value: prop,
          label: RegionData[cityCode][prop]
        })
        CodeToText[prop] = RegionData[cityCode][prop]
        TextToCode[provinceText][cityText][RegionData[cityCode][prop]] = {
          code: prop
        }
      }
      if (cityChildren.length) {
        province[j].children = cityChildren
      }
    }
  }
}

// 添加“全部”选项
const provinceAndCityDataPlus = cloneDeep(provinceAndCityData)
provinceAndCityDataPlus.unshift({
  value: '',
  label: '全部'
})
for (let i = 0, len = provinceAndCityDataPlus.length; i < len; i++) {
  const province = provinceAndCityDataPlus[i].children
  if (province && province.length) {
    province.unshift({
      value: '',
      label: '全部'
    })

    for (let j = 0, len = province.length; j < len; j++) {
      const city = province[j].children
      if (city && city.length) {
        city.unshift({
          value: '',
          label: '全部'
        })
      }
    }
  }
}

const regionDataPlus = cloneDeep(regionData)
regionDataPlus.unshift({
  value: '',
  label: '全部'
})
for (let i = 0, len = regionDataPlus.length; i < len; i++) {
  const province = regionDataPlus[i].children
  if (province && province.length) {
    province.unshift({
      value: '',
      label: '全部'
    })

    for (let j = 0, len = province.length; j < len; j++) {
      const city = province[j].children
      if (city && city.length) {
        city.unshift({
          value: '',
          label: '全部'
        })
      }
    }
  }
}
export { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode }
