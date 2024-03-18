import React from "react"

import { getId } from "@/lib/utils"

export const H2: React.FC<{ children: string }> = ({
  children,
  ...otherProps
}) => {
  const id = getId(children)
  return (
    <h2
      id={id}
      className="relative mb-8 mt-24 text-2xl font-medium before:absolute before:-top-4 before:left-0 before:h-[3px] before:w-6 before:bg-current"
      {...otherProps}
    >
      {children}
    </h2>
  )
}

export const H3 = ({ children, ...otherProps }: { children: string }) => {
  const id = getId(children)
  return (
    <h3 id={id} {...otherProps}>
      {children}
    </h3>
  )
}

export const P = ({ children, ...otherProps }: { children: string }) => {
  return (
    <p className="mb-4" {...otherProps}>
      {children}
    </p>
  )
}

export const A = ({
  children,
  ...otherProps
}: {
  children: string
  href: string
}) => {
  return (
    <a
      target="_blank"
      className="text-blue-500 hover:underline hover:decoration-dotted hover:decoration-current hover:underline-offset-4"
      {...otherProps}
    >
      {children}
    </a>
  )
}

export const Pre = ({ children, ...otherProps }: { children: string }) => {
  return (
    <pre
      className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded-md overflow-auto"
      {...otherProps}
    >
      {children}
    </pre>
  )
}

export const Code = ({ children, ...otherProps }: { children: string }) => {
  return (
    <code className="text-sm" {...otherProps}>
      {children}
    </code>
  )
}

export const Ol = ({
  children,
  ...otherProps
}: {
  children: React.ReactNode
}) => {
  return (
    <ol
      className="mb-4 list-none"
      style={{
        counterReset: "counts 0",
      }}
      {...otherProps}
    >
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child: any, index) =>
          child.props ? (
            <li
              key={index}
              className="flex mb-1 before:content-[counter(counts)_'._'] before:pr-4 before:font-mono before:font-medium before:text-gray-500"
              style={{
                counterIncrement: "counts 1",
              }}
            >
              <div>{child.props.children}</div>
            </li>
          ) : null
        )}
    </ol>
  )
}

export const Strong = ({ children, ...otherProps }: { children: string }) => {
  return (
    <strong
      className="font-semibold underline decoration-dotted decoration-current underline-offset-4"
      {...otherProps}
    >
      {children}
    </strong>
  )
}

export const BlockQuote = ({
  children,
  ...otherProps
}: {
  children: string
}) => {
  return (
    <blockquote
      className="pl-4 border-l-2 border-gray-500 text-gray-700 italic"
      {...otherProps}
    >
      {children}
    </blockquote>
  )
}
