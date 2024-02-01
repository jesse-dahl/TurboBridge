import Image from "next/image"
import React from "react"
import tw from "tailwind-styled-components"
import bcnLogo from "../../../public/img/bcn-logo.svg"

const AuthLayoutOuterContainer = tw.div`
  bg-black
`
const AuthLayoutFullHeightContainer = tw.div`  
  flex
  h-full
  justify-center
`
const AuthLayoutFlexColContainer = tw.div`
  flex
  flex-col
  items-center
  justify-center
`
const AuthLayoutImageContainer = tw.div`
  hidden
  h-full
  lg:flex
  w-[150px]
  lg:w-[500px]
  max-h-[250px]
  max-w-[500px]
  justify-center
  items-center
`
const AuthLayoutInnerImageContainer = tw.div`
  w-full
  h-full
  flex
  relative
  justify-center
  items-center
`
const AuthLayoutModalContainer = tw.div`
  flex
  mb-4
  items-center
  justify-center
`

export function AuthLayout({ children }: { children?: React.ReactNode }) {
  return (
    <AuthLayoutOuterContainer className="h-screen">
      <AuthLayoutFullHeightContainer>
        <AuthLayoutFlexColContainer>
          {/* Image Container */}
          <AuthLayoutImageContainer>
            {/* Images */}
            <AuthLayoutInnerImageContainer>
              <Image
                src={bcnLogo as string}
                alt="Biproxi logo"
                style={{ objectFit: "contain" }}
                width={375}
              />
              {/* <div className="text-teal60 text-[48px] uppercase">
                {"Capital "}
              </div>
              <div className="text-grey90 text-[48px] uppercase">
                Network
              </div> */}
            </AuthLayoutInnerImageContainer>
          </AuthLayoutImageContainer>

          {/* Auth Modal - Clerk */}
          <AuthLayoutModalContainer>
            <div className="flex grow-0 items-center justify-center">
              {children}
            </div>
          </AuthLayoutModalContainer>
        </AuthLayoutFlexColContainer>
      </AuthLayoutFullHeightContainer>
    </AuthLayoutOuterContainer>
  )
}
