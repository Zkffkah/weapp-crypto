import moment from "moment";

export const getOption = (ticker, tickData) => {
  //ccxt     /** [ timestamp, open, high, low, close, volume ] */
  // 数据意义：timestamp 开盘(open)，收盘(close)，最低(lowest)，最高(highest) 成交量(volume)
  //需要转化
  function splitData(rawData) {
    const categoryData = [];
    const values = [];
    const volumes = [];
    for (let i = 0; i < rawData.length; i += 1) {
      const arr = [rawData[i][0], rawData[i][1], rawData[i][4],
        rawData[i][3], rawData[i][2], rawData[i][5]];
      values.push(arr);
      const a = arr.splice(0, 1)[0];
      const b = `${moment(a).format('YYYY/MM/DD')}`;
      categoryData.push(b);
      volumes.push(arr[4]);
    }
    return {
      categoryData,
      values,
      volumes,
    };
  }

  const data = splitData(tickData);

  // MA计算公式
  function calculateMA(dayCount, values) {
    const result = [];
    for (let i = 0; i < values.length; i += 1) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j += 1) {
        sum += values[i - j][1];
      }
      result.push((sum / dayCount).toFixed(3));
    }
    return result;
  }

  const option = {
    title: {
      text: "", left: 0,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
        type: 'cross',
      },
    },
    legend: {
      data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
    },
    grid: [{
      left: '1%', right: '1%', height: '60%',
    }, {
      left: '5%', right: '1%', top: '75%', height: '16%',
    }, {
      left: '5%', right: '1%', top: '87%', height: '8%',
    }],
    xAxis: [{
      type: 'category',
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {
        onZero: false,
      },
      splitLine: {
        show: false,
      },
      splitNumber: 20,
      axisTick: {show: false},
      axisLabel: {show: true},
    }, {
      type: 'category',
      gridIndex: 1,
      axisLine: {show: false},
      axisTick: {show: false},
      data: data.categoryData,
      axisLabel: {
        show: false,
      },
    }, {
      type: 'category',
      gridIndex: 2,
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        show: false,
      },
    }],
    yAxis: [{
      scale: true,
      axisLabel: {
        inside: true,
        textStyle: {
          baseline: 'bottom'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {show: false},
      splitLine: {show: false},
      splitArea: {
        show: false,
      },
    }, {
      gridIndex: 1,
      splitNumber: 3,
      axisLine: {
        onZero: false, show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    }, {
      gridIndex: 2,
      splitNumber: 4,
      axisLine: {
        onZero: false, show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    }],
    dataZoom: [{
      type: 'inside',
      xAxisIndex: [0, 0],
      start: 85,
      end: 100,
    }, {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '95%',
      height: '4%',
      start: 85,
      end: 100,
    }, {
      show: false,
      xAxisIndex: [0, 2],
      type: 'slider',
      start: 85,
      end: 100,
    }],
    series: [{
      name: '日K',
      type: 'candlestick',
      data: data.values,
      itemStyle: {
        normal: {
          color: '#ef232a',
          color0: '#14b143',
          borderColor: '#ef232a',
          borderColor0: '#14b143',
        },
      },
    }, {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data.volumes,
      itemStyle: {
        normal: {
          color(params) {
            let colorList;
            if (data.values[params.dataIndex][1] >=
              data.values[params.dataIndex][0]) {
              colorList = '#ef232a';
            } else {
              colorList = '#14b143';
            }
            return colorList;
          },
        },
      },
    }, {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5, data.values),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 1,
        },
      },
    }, {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10, data.values),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 1,
        },
      },
    }, {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20, data.values),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 1,
        },
      },
    }, {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30, data.values),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 1,
        },
      },
    }],
  }
  return option
}
