/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/
import './quasar'

import Vue from 'vue'
Vue.config.productionTip = false

<%
extras && extras.filter(asset => asset).forEach(asset => {
%>
import 'quasar-extras/<%= asset %>'
<% }) %>

<%
if (animations) {
  if (animations === 'all') {
%>
import 'quasar-extras/animate'
<%
  }
  else {
    animations.filter(asset => asset).forEach(asset => {
%>
import 'quasar-extras/animate/<%= asset %>.css'
<%
    })
  }
}
%>

import 'quasar-app-styl'

<% css && css.filter(css => css).forEach(asset => { %>
import 'src/css/<%= asset %>'
<% }) %>

import App from 'src/App'

import router from 'src/router'
<% if (store) { %>
import store from 'src/store'
<% } %>

const app = {
  el: '#q-app',
  router,
<% if (store) { %>store,<% } %>
  ...App
}

<%
  if (plugins) {
    function hash (str) {
      const name = str.replace(/\W+/g, '')
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
%>
const plugins = []
<%
plugins.filter(asset => asset && asset !== 'boot').forEach(asset => {
  if (asset === 'boot') { return }
  let importName = 'plugin' + hash(asset)
%>
import <%= importName %> from 'src/plugins/<%= asset %>'
plugins.push(<%= importName %>)
<% }) %>
plugins.forEach(plugin => plugin({ app, router,<% if (store) { %> store,<% } %> Vue }))
<% }
const hasBootPlugin = plugins && plugins.find(asset => asset === 'boot')

if (hasBootPlugin) { %>
import boot from 'src/plugins/boot'
<% } %>

<% if (ctx.mode.electron) { %>
import electron from 'electron'
Vue.prototype.$q.electron = electron
<% } %>

<% if (ctx.mode.pwa) { %>
import FastClick from 'fastclick'
// Needed only for iOS PWAs
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.navigator.standalone) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
<% } %>

<% if (ctx.mode.cordova) { %>
  <% if (ctx.target.ios) { %>
    // Needed only for iOS
    import FastClick from 'fastclick'
    document.addEventListener('DOMContentLoaded', () => {
      FastClick.attach(document.body)
    }, false)
  <% } %>
document.addEventListener('deviceready', () => {
Vue.prototype.$q.cordova = window.cordova
<% } %>

<% if (hasBootPlugin) { %>
boot({ app, router,<% if (store) { %> store,<% } %> Vue })
<% } else { %>
new Vue(app)
<% } %>

<% if (ctx.mode.cordova) { %>
}, false) // on deviceready
<% } %>
