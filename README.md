# font

需求列表：

- [x] 智能多行省略，JavaScript截断文字（尾部空格，自定义省略符号等）beta
- [x] 计算文字的宽度（给一串文字，告诉你它的宽度）

# Install

```
npm install easyfont --save
```

# Usage

```
import EasyFont from 'easyfont';

// 例子采用ES7语法，需你自行替换到当前工程语言环境，建议使用ES7，为啥？看着舒服，读起来简单明了 ^o^
// 截断字符
const omit = async (str) => {
  const result = await new EasyFont().pipe(str)
          .operation('truncate')
          .option({ width: 270, row: 2, fontSize: 14, fontFamily: "'PingFang SC', sans-serif" })
          .value();
  return result;
}

// 获取文字宽度
const measure = async (str) => {
  const result = await new EasyFont().pipe(str)
          .operation('measure')
          .option({ fontSize: 14, fontFamily: "'PingFang SC', sans-serif" })
          .value();
  return result;
}
...
const res1 = await omit('Skylor.min is very handsome!');
const res2 = await measure('Skylor.min is very handsome!');
console.log(res1.result); // 省略后的字符，或许这就是你需要的 ^o^
console.log(res2.width); // 测量文字的宽度
...
```

# Option

* fontSize -> set font size.
* fontFamily -> set font family, eg: 'PingFang SC', sans-serif.
* fontWeight -> set font weight, eg: bold.
* src -> set font src, (use for custom font family, deprecated!)
* width -> set font box width.
* row -> omit the number of rows.
* lack -> at the end of the space num.
* ellipsis -> custom apostrophes.

# Method

_this = new EasyFont();_

#### pipi(string)
导入需要操作的字符串到操作流中。
* 参数

 1. string __(String)__ 导入的字符串
* 返回

 流
 
#### id(any)
标记返回结果，在特定情况这个可能会拯救你的人生
* 参数

 1. any __(Any)__ 标记的记号，可以是任何你想放进去的格式
* 返回

 流
 
#### 

> come soon.

# License

MIT License

Copyright (c) 2017 fang.yongle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
