<template>
  <div>
    <group>
      <x-address title="开户银行省市" v-model="value3" raw-value :list="addressData"></x-address>
    </group>
  </div>
</template>

<script>
import { Group, XAddress, ChinaAddressV3Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'

export default {
  components: {
    Group,
    XAddress,
    XButton,
    Cell
  },
  data () {
    return {
      title: '默认为空',
      value_0_1: [],
      value: [],
      title2: '设置值',
      value2: ['天津市', '市辖区', '和平区'],
      value3: ['广东省', '中山市', '--'],
      addressData: ChinaAddressV3Data,
      value4: [],
      value5: ['广东省', '深圳 市', '南山区']
    }
  },
  methods: {
    changeData () {
      this.value2 = ['430000', '430400', '430407']
    },
    changeDataByLabels () {
      this.value2 = ['广东省', '广州市', '天河区']
    },
    changeDataByLabels2 () {
      this.value2 = ['广东省', '中山市', '--']
    },
    getName (value) {
      return value2name(value, ChinaAddressV3Data)
    }
  }
}
</script>
<style lang="less" scoped>
  .vux-no-group-title{
    margin-top: 0px;
  }
 @group-title-margin-top:0px;
</style>
