# 数据说明
这个数据库包括这三个文件夹：family, person, company.

## 如何添加新人物
如果要添加新人物，至少做以下3个操作

1. 在person下创建此人名字命名的文件夹
2. 添加到相应的family的yaml里
    1. 将此人放入relations中，注意格式要和其他relations一致，比如[A,B,妻] 意味着B是A的妻子
    2. 将此人放入outer或inner中的一个array中
