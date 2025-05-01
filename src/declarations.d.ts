declare module '*.scss' {
  const src: Record<string, string>
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}
