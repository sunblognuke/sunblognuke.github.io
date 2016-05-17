title: Python Tricks
date: 2016-01-12 11:24:02
categories: Dev
description:
tags: [Python]

---

## 获取数组交集

    #方法一:
    a=[2,3,4,5]
    b=[2,5,8]
    tmp = [val for val in a if val in b]
    print tmp
    #[2, 5]

    #方法二
    print list(set(a).intersection(set(b)))

## 获取数组并集 (合并去重)

    print list(set(a).union(set(b)))

## 获取数组差集

    print list(set(b).difference(set(a))) # b中有而a中没有的

## 利用PIL比较两个图片的相似度
需要安装[PIL图像模块](http://www.pythonware.com/products/pil/)，代码虽短但效果不错，还是非常靠谱的，前提是图片要大一些，太小的图片不好比较, 代码如下：

    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    import Image, sys, os

    reload(sys)
    sys.setdefaultencoding('utf-8')

    def make_regalur_image(img, size = (256, 256)):
        return img.resize(size).convert('RGB')

    def split_image(img, part_size = (64, 64)):
        w, h = img.size
        pw, ph = part_size
        
        assert w % pw == h % ph == 0
        
        return [img.crop((i, j, i+pw, j+ph)).copy() \
                    for i in xrange(0, w, pw) \
                    for j in xrange(0, h, ph)]

    def hist_similar(lh, rh):
        assert len(lh) == len(rh)
        return sum(1 - (0 if l == r else float(abs(l - r))/max(l, r)) for l, r in zip(lh, rh))/len(lh)

    def calc_similar(li, ri):
    #   return hist_similar(li.histogram(), ri.histogram())
        return sum(hist_similar(l.histogram(), r.histogram()) for l, r in zip(split_image(li), split_image(ri))) / 16.0
                
    def calc_similar_by_path(lf, rf):
        li, ri = make_regalur_image(Image.open(lf)), make_regalur_image(Image.open(rf))
        return calc_similar(li, ri)

    def make_doc_data(lf, rf):
        li, ri = make_regalur_image(Image.open(lf)), make_regalur_image(Image.open(rf))
        li.save(lf + '_regalur.png')
        ri.save(rf + '_regalur.png')
        fd = open('stat.csv', 'w')
        fd.write('\n'.join(l + ',' + r for l, r in zip(map(str, li.histogram()), map(str, ri.histogram()))))
    #   print >>fd, '\n'
    #   fd.write(','.join(map(str, ri.histogram())))
        fd.close()
        import ImageDraw
        li = li.convert('RGB')
        draw = ImageDraw.Draw(li)
        for i in xrange(0, 256, 64):
            draw.line((0, i, 256, i), fill = '#ff0000')
            draw.line((i, 0, i, 256), fill = '#ff0000')
        li.save(lf + '_lines.png')
        
    if __name__ == '__main__':
        path = u'E:\\data\\tmp' 
        toPath = u'E:\\data\\tmp'

        path = path.replace('\\', '/')
        toPath = toPath.replace('\\', '/')

        print 'start compare similar....'
        for x in os.listdir(path):
            for y in os.listdir(toPath):
                if x == y:
                    continue

                degree = calc_similar_by_path(os.path.join(path,x), os.path.join(toPath,y))
                if degree > 0.6:
                    print 'similar so much in test_case (%s <-> %s): %.3f%%'%(x, y, degree * 100)
                    # make_doc_data(x, y)

        print 'end compare similar....'

