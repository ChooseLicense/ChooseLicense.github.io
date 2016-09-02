---
layout: default
permalink: /appendix/
title: 附录
class: license-types
---

你可以在下面表格中查看所有协议信息，也可以到 [ChooseLicense](https://github.com/ChooseLicense/ChooseLicense.github.io) 查看网站源码，协助我们完善这个网站。

如果你想选择一个许可协议 **[建议从首页开始选择](/)**，首页会为你推荐适合你的许可协议。

<table border style="font-size: xx-small">
{% assign types = "permissions|conditions|limitations" | split: "|" %}
<tr>
  <th scope="col" style="text-align: center">开源协议</th>
  {% assign seen_tags = '' %}
  {% for type in types %}
    {% assign rules = site.data.rules[type] | sort: "label" %}
    {% for rule_obj in rules %}
      {% if seen_tags contains rule_obj.tag %}
        {% continue %}
      {% endif %}
      {% capture seen_tags %}{{ seen_tags | append:rule_obj.tag }}{% endcapture %}
      <th scope="col" style="text-align: center; width:7%"><a href="#{{ rule_obj.tag }}">
      {% if rule_obj.label == 'Commercial Use' %}
        商业用途
      {% elsif rule_obj.label == 'Distribution' %}
        分发
      {% elsif rule_obj.label == 'Modification' %}
        修改
      {% elsif rule_obj.label == 'Patent Use' %}
        专利授权
      {% elsif rule_obj.label == 'Private Use' %}
        私用
      {% elsif rule_obj.label == 'Disclose Source' %}
        公开源码
      {% elsif rule_obj.label == 'License and Copyright Notice' %}
        放置许可协议与版权信息
      {% elsif rule_obj.label == 'Network Use is Distribution' %}
        使用网络分发
      {% elsif rule_obj.label == 'Same License' %}
        使用相同协议
      {% elsif rule_obj.label == 'State Changes' %}
        声明变更
      {% elsif rule_obj.label == 'Hold Liable' %}
        承担责任
      {% elsif rule_obj.label == 'Trademark Use' %}
        使用商标
      {% else %}
        {{ rule_obj.label }}
      {% endif %}
      </a></th>
    {% endfor %}
  {% endfor %}
</tr>
{% for license in site.licenses | sort: 'path' %}
  <tr style="height: 3em"><th scope="row"><a href="{{ license.id }}">{{ license.title }}</a></th>
  {% assign seen_tags = '' %}
  {% for type in types %}
    {% assign rules = site.data.rules[type] | sort: "label" %}
    {% for rule_obj in rules %}
      {% assign req = rule_obj.tag %}
      {% if seen_tags contains req %}
        {% continue %}
      {% endif %}
      {% capture seen_tags %}{{ seen_tags | append:req }}{% endcapture %}
      {% assign seen_req = false %}
      {% for t in types %}
        {% if license[t] contains req %}
          <td class="license-{{ t }}" style="text-align:center">
            <span class="{{ req }}">
              <span class="license-sprite {{ req }}"></span>
            </span>
          </td>
          {% assign seen_req = true %}
        {% endif %}
      {% endfor %}
      {% unless seen_req %}
        <td></td>
      {% endunless %}
    {% endfor %}
  {% endfor %}
  </tr>
{% endfor %}
</table>

## 说明

<p>开源协议中标注 <span class="license-permissions"><span class="license-sprite"></span></span> <b>允许</b> 的条目表示允许进行这样的行为，否则可能表示不允许。</p>

<p>开源协议中标注 <span class="license-conditions"><span class="license-sprite"></span></span> <b>要求</b> 的条目为使用者必须遵循的内容。</p>

<p>开源协议中标注 <span class="license-limitations"><span class="license-sprite"></span></span> <b>禁止</b> 的内容通常为作者免责协议，有时也表示明确禁止授予使用者专利或者商标使用权。</p>

<dl>
{% assign seen_tags = '' %}
{% for type in types %}
  {% assign rules = site.data.rules[type] | sort: "label" %}
  {% for rule_obj in rules %}
    {% assign req = rule_obj.tag %}
    {% if seen_tags contains req %}
      {% continue %}
    {% endif %}
    <dt id="{{ req }}">
      {% if rule_obj.label == 'Commercial Use' %}
        商业用途
      {% elsif rule_obj.label == 'Distribution' %}
        分发
      {% elsif rule_obj.label == 'Modification' %}
        修改
      {% elsif rule_obj.label == 'Patent Use' %}
        专利授权
      {% elsif rule_obj.label == 'Private Use' %}
        私用
      {% elsif rule_obj.label == 'Disclose Source' %}
        公开源码
      {% elsif rule_obj.label == 'License and Copyright Notice' %}
        放置许可协议与版权信息
      {% elsif rule_obj.label == 'Network Use is Distribution' %}
        使用网络分发
      {% elsif rule_obj.label == 'Same License' %}
        使用相同协议
      {% elsif rule_obj.label == 'State Changes' %}
        声明变更
      {% elsif rule_obj.label == 'Hold Liable' %}
        承担责任
      {% elsif rule_obj.label == 'Trademark Use' %}
        使用商标
      {% else %}
        {{ rule_obj.label }}
      {% endif %}
    </dt>
    {% capture seen_tags %}{{ seen_tags | append:req }}{% endcapture %}
    {% for t in types %}
      {% for r in site.data.rules[t] | sort: "label" %}
        {% if r.tag == req %}
          <dd class="license-{{t}}"><span class="license-sprite"></span> {{ r.description }}</dd>
        {% endif %}
      {% endfor %}
    {% endfor %}
  {% endfor %}
{% endfor %}
</dl>
