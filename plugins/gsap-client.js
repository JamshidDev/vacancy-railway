import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('gsap', gsap)
})