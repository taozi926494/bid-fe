<template>
  <div class="filter">
    <span class="title">类型</span>
    <el-select
      v-model="bidType"
      clearable
      placeholder="全部"
      size="small"
       @change="onFilterChange"
    >
      <el-option v-for="(typeArr, type) in BID_TYPE_CN" :key="type" :label="type" :value="type"></el-option>
    </el-select>

    <span class="title">信息化建设阶段</span>
    <el-select
      v-model="itLevel"
      clearable
      placeholder="全部"
      size="small"
      @change="onFilterChange"
    >
      <el-option v-for="(item, key) in IT_LEVELS" :key="key" :label="item.level" :value="key"></el-option>
    </el-select>

    <span class="title">区域</span>
    <el-select
      size="small"
      multiple
      collapse-tags
      v-model="regions"
      placeholder="全部"
       @change="onFilterChange"
    >
      <el-option v-for="region in REGIONS" :key="region" :label="region" :value="region"></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { REGIONS, BID_TYPE_CN, IT_LEVELS } from '@/utils/const'

export default {
  data() {
    return {
      REGIONS,
      BID_TYPE_CN,
      IT_LEVELS
    };
  },
  computed: {
    bidType: {
      get: function() {
        return this.$store.state.filter.bid_type
      },
      set: function(val) {
        this.$store.commit('SET_BID_TYPE', val)
      }
    },
    itLevel: {
      get: function() {
        return this.$store.state.filter.it_level
      },
      set: function(val) {
        this.$store.commit('SET_IT_LEVEL', val)
      }
    },
    regions: {
      get: function() {
        return this.$store.state.filter.regions
      },
      set: function(val) {
        this.$store.commit('SET_REGIONS', val)
      }
    }
  },
  methods: {
    onFilterChange() {
      this.$store.commit('SET_PAGE', 1)
      this.$emit('filterChange')
    }
  }
};
</script>

<style lang="scss">
.filter {
  @include flex(row, flex-start);
  @include shadow-card();
  background-color: white;
  padding: 15px;
  .title {
    font-size: 14px;
    margin: 0 15px;
  }
}
</style>