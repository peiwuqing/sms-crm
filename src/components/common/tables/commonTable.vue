<template>
  <div id="commonTable">
    <el-table :data="data" :max-height="maxHeight" border stripe tooltip-effect="light"
              　　　　　　@selection-change="handleSelectionChange">
      <slot name="table_first"/>
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.show != false"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align?item.align:'center'"
          :width="item.width"
          :fixed="item.fixed?item.fixed:false"
          :type="item.type?item.type:''"
            :formatter="item.formatter?item.formatter : formatterValue"
          :show-overflow-tooltip="item.showTooltip?item.showTooltip:false"
        >
        </el-table-column>
      </template>
      <slot name="table_operation"/>
    </el-table>
    <el-pagination
      v-if="pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center;margin:20px 0;"
      :current-page="pager.pageNo"
      :page-size="pager.pageSize"
      :page-sizes="pager.sizes"
      :total="pager.total"
      background
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  import { Table, TableColumn } from 'element-ui'
  import { getCell, getColumnByCell } from 'element-ui/packages/table/src/util'
  import { getStyle, hasClass } from 'element-ui/src/utils/dom'

  // TODO:   临 时 处理 shoptip不能复制的问题 ,待 element-ui 修复后,去掉此代码
  Object.assign(Table.components.TableBody.methods, {
    handleCellMouseLeave() {
      const tooltip = this.$refs.tooltip
      if (tooltip && tooltip.expectedState) {
        tooltip.setExpectedState(false)
        clearTimeout(tooltip._timeoutLeave)
        tooltip._timeoutLeave = setTimeout(() => {
          if (!tooltip.expectedState) {
            tooltip.handleClosePopper()
          }
        }, 150)
      }
      const cell = getCell(event)
      if (!cell) return

      const oldHoverState = this.table.hoverState || {}
      this.table.$emit(
        'cell-mouse-leave',
        oldHoverState.row,
        oldHoverState.column,
        oldHoverState.cell,
        event
      )
    },
    handleCellMouseEnter(event, row) {
      // console.log('handleCellMouseEnter', this.$refs.tooltip)
      const table = this.table
      const cell = getCell(event)
      const tooltip = this.$refs.tooltip

      if (cell) {
        const column = getColumnByCell(table, cell)
        const hoverState = (table.hoverState = { cell, column, row })
        table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event)
      }

      // 判断是否text-overflow, 如果是就显示tooltip
      const cellChild = event.target.querySelector('.cell')
      if (!(hasClass(cellChild, 'el-tooltip') && cellChild.childNodes.length)) {
        setTimeout(() => {
          tooltip.setExpectedState(false)
          tooltip.handleClosePopper()
        }, 600)
        return
      }
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      const range = document.createRange()
      range.setStart(cellChild, 0)
      range.setEnd(cellChild, cellChild.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width
      const padding =
        (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) +
        (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0)
      if (
        (rangeWidth + padding > cellChild.offsetWidth ||
          cellChild.scrollWidth > cellChild.offsetWidth) &&
        this.$refs.tooltip
      ) {
        // TODO 会引起整个 Table 的重新渲染，需要优化
        const showTooltip = () => {
          this.tooltipContent = cell.innerText || cell.textContent
          tooltip.referenceElm = cell
          tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
          tooltip.doDestroy()
          tooltip.setExpectedState(true)
          this.activateTooltip(tooltip)
        }
        clearTimeout(tooltip._timeoutEnter)
        tooltip._timeoutEnter = setTimeout(() => {
          !tooltip.expectedState && showTooltip()
        }, 500)
      }
    }
  })
  export default {
    name: 'commonTable',
    props: {
      columns: Array,
      data: Array,
      pager: Object,
      maxHeight: {
        type: Number,
        default: 2000
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val);
      },
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val);
      },
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val);
      },
      formatterValue(row, column, cellValue) {
        return cellValue;
      }
    }
  }
</script>
