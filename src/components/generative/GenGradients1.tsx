import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 1099
  const html = `
  <css-doodle>
    :doodle {
      @grid: 126x1 / 400px 1099px;
    }
    :container {
      display: flex;
      flex-direction: column;
      --red: #dd2020;
      --pink: #ff8bab;
      --light-yellow: #f2d5aa;
      --blue: #1d3bda;
      --dark-blue: #313d80;
      --black: #000;
      --yellow: #ffcf2e;
      --orange: #EF7137;
    }
    width: 300%;
    @nth(2, 25, 26, 27, 33, 34, 45, 46, 47, 48, 59, 60, 66, 80, 81, 82, 83, 100, 102) {
      animation: animate 30s linear infinite alternate;
    }

    @nth(23, 24, 29, 31, 36, 38, 56, 57, 58, 64, 76, 78, 99, 101, 106, 90) {
      animation: animateR 30s linear infinite alternate;
    }

    @keyframes animate {
      0% {
        transform: translate3d(-33.33%, 0, 0);
      }
      100% {
        transform: translate3d(-66.66%, 0, 0);
      }
    }

    @keyframes animateR {
      0% {
        transform: translate3d(-33.33%, 0, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }

    @nth(1) {
      background: var(--red);
      height: 2px;
    }
    @nth(2) {
      background: radial-gradient(var(--red) 53%, transparent 57%) -8px -8px / 16px 16px, linear-gradient(0, var(--light-yellow), var(--light-yellow));
      height: 40px;
    }
    @nth(3) {
      background: var(--blue);
      height: 4px;
    }
    @nth(4) {
      background: var(--black);
      height: 1px;
    }
    @nth(5) {
      background: var(--blue);
      height: 6px;
    }
    @nth(6) {
      background: var(--black);
      height: 6px;
    }
    @nth(7) {
      background: var(--light-yellow);
      height: 6px;
    }
    @nth(8) {
      background: var(--black);
      height: 1px;
    }
    @nth(9) {
      background: var(--red);
      height: 3px;
    }
    @nth(10) {
      background: var(--yellow);
      height: 2px;
    }
    @nth(11) {
      background: var(--light-yellow);
      height: 4px;
    }
    @nth(12) {
      background: var(--yellow);
      height: 2px;
    }
    @nth(13) {
      background: var(--light-yellow);
      height: 1px;
    }
    @nth(14) {
      background: var(--yellow);
      height: 1px;
    }
    @nth(15) {
      background: var(--light-yellow);
      height: 2px;
    }
    @nth(16) {
      background: var(--red);
      height: 2px;
    }
    @nth(17) {
      background: var(--light-yellow);
      height: 6px;
    }
    @nth(18) {
      background: var(--blue);
      height: 4px;
    }
    @nth(19) {
      background: var(--yellow);
      height: 3px;
    }
    @nth(20) {
      background: var(--red);
      height: 2px;
    }
    @nth(21) {
      background: var(--light-yellow);
      height: 6px;
    }
    @nth(22) {
      background: var(--red);
      height: 2px;
    }
    @nth(23) {
      background: repeating-linear-gradient(90deg, var(--red) 0, var(--red) 18px, var(--light-yellow) 18px, var(--light-yellow) 36px);
      height: 18px;
    }
    @nth(24) {
      background: repeating-linear-gradient(90deg, var(--light-yellow) 0, var(--light-yellow) 18px, var(--black) 18px, var(--black) 36px);
      height: 5px;
    }
    @nth(25, 27) {
      background: repeating-linear-gradient(90deg, var(--red) 0, var(--red) 12px, var(--yellow) 12px, var(--yellow) 12.5px);
      height: 12px;
    }
    @nth(26) {
      background: var(--yellow);
      height: 1px;
    }
    @nth(28, 30, 32) {
      background: var(--red);
      height: 2px;
    }
    @nth(29) {
      background: repeating-linear-gradient(90deg, var(--orange) 0, var(--orange) 16px, var(--red) 16px, var(--red) 18px, var(--pink) 18px, var(--pink) 34px, var(--red) 34px, var(--red) 36px, var(--yellow) 36px, var(--yellow) 52px, var(--red) 52px, var(--red) 54px);
      height: 16px;
    }
    @nth(31) {
      background: repeating-linear-gradient(90deg, var(--yellow) 0, var(--yellow) 16px, var(--red) 16px, var(--red) 18px, var(--orange) 18px, var(--orange) 34px, var(--red) 34px, var(--red) 36px, var(--pink) 36px, var(--pink) 52px, var(--red) 52px, var(--red) 54px);
      height: 16px;
    }
    @nth(33) {
      background: repeating-linear-gradient(90deg, var(--red) 0, var(--red) 9px, var(--light-yellow) 9px, var(--light-yellow) 18px);
      height: 5px;
    }
    @nth(34) {
      background: repeating-linear-gradient(90deg, var(--light-yellow) 0, var(--light-yellow) 9px, var(--red) 9px, var(--red) 18px);
      height: 9px;
    }
    @nth(35, 37, 39) {
      background: var(--red);
      height: 1px;
    }
    @nth(36) {
      background: repeating-linear-gradient(90deg, var(--pink) 0, var(--pink) 22px, var(--red) 22px, var(--red) 23px, var(--pink) 23px, var(--pink) 45px, var(--red) 45px, var(--red) 46px, var(--orange) 46px, var(--orange) 68px, var(--red) 68px, var(--red) 69px, var(--pink) 69px, var(--pink) 91px, var(--red) 91px, var(--red) 92px);
      height: 22px;
    }
    @nth(38) {
      background: repeating-linear-gradient(90deg, var(--yellow) 0, var(--yellow) 22px, var(--red) 22px, var(--red) 23px, var(--orange) 23px, var(--orange) 45px, var(--red) 45px, var(--red) 46px, var(--yellow) 46px, var(--yellow) 68px, var(--red) 68px, var(--red) 69px, var(--pink) 69px, var(--pink) 91px, var(--red) 91px, var(--red) 92px);
      height: 22px;
    }
    @nth(40) {
      background: repeating-linear-gradient(90deg, var(--red) 0, var(--red) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, var(--pink) 0, var(--pink) 24px, var(--orange) 24px, var(--orange) 48px, var(--yellow) 48px, var(--yellow) 72px);
      height: 7px;
    }
    @nth(41, 43) {
      background: repeating-linear-gradient(90deg, var(--black) 0, var(--black) 12px, var(--light-yellow) 12px, var(--light-yellow) 12.5px);
      height: 8px;
    }
    @nth(42, 44) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), linear-gradient(180deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0, var(--red) 12px, var(--light-yellow) 12px, var(--light-yellow) 12.5px);
      height: 12px;
    }
    @nth(45) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0px, var(--light-yellow) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--black) 0, var(--black) 28px, var(--red) 28px, var(--red) 56px, var(--orange) 56px, var(--orange) 84px);
      height: 7px;
    }
    @nth(46) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0px, var(--light-yellow) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--orange) 0, var(--orange) 7px, var(--black) 7px, var(--black) 35px,var(--red) 35px, var(--red) 63px, var(--orange) 63px, var(--orange) 84px);
      height: 7px;
    }
    @nth(47) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0px, var(--light-yellow) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--orange) 0, var(--orange) 14px, var(--black) 14px, var(--black) 42px,var(--red) 42px, var(--red) 70px, var(--orange) 70px, var(--orange) 84px);
      height: 7px;
    }
    @nth(48) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0px, var(--light-yellow) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--orange) 0, var(--orange) 21px, var(--black) 21px, var(--black) 49px,var(--red) 49px, var(--red) 77px, var(--orange) 77px, var(--orange) 84px);
      height: 7px;
    }
    @nth(49) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0px, var(--light-yellow) 0.5px, transparent 0.5px, transparent 22px), repeating-linear-gradient(90deg, var(--red) 0, var(--red) 22px, var(--orange) 22px, var(--orange) 44px, var(--red) 44px, var(--red) 66px, var(--black) 66px, var(--black) 88px);
      height: 22px;
    }
    @nth(50) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0px, var(--light-yellow) 0.5px, transparent 0.5px, transparent 22px), repeating-linear-gradient(90deg, var(--orange) 0, var(--orange) 22px, var(--black) 22px, var(--black) 88px);
      height: 22px;
    }
    @nth(51) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0px, var(--light-yellow) 0.5px, transparent 0.5px, transparent 22px), repeating-linear-gradient(90deg, var(--orange) 0, var(--orange) 22px, var(--yellow) 22px, var(--yellow) 44px, var(--pink) 44px, var(--pink) 66px, var(--yellow) 66px, var(--yellow) 88px);
      height: 22px;
    }
    @nth(52) {
      background: linear-gradient(180deg, var(--yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--yellow) 0, var(--yellow) 0.5px, transparent 0.5px, transparent 9px), linear-gradient(90deg, var(--red), var(--red));
      height: 9px;
    }
    @nth(53) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0, var(--red) 0.5px, transparent 0.5px, transparent 9px), linear-gradient(90deg, var(--light-yellow), var(--light-yellow));
      height: 9px;
    }
    @nth(54, 56) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--yellow) 0, var(--yellow) 12px, var(--red) 12px, var(--red) 12.5px);
      height: 12px;
    }
    @nth(55) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--pink) 0, var(--pink) 12px, var(--red) 12px, var(--red) 12.5px);
      height: 12px;
    }
    @nth(56) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0px, var(--red) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--yellow) 0, var(--yellow) 28px, var(--orange) 28px, var(--orange) 56px, var(--pink) 56px, var(--pink) 84px);
      height: 7px;
    }
    @nth(57) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0px, var(--red) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--pink) 0, var(--pink) 7px, var(--yellow) 7px, var(--yellow) 35px,var(--orange) 35px, var(--orange) 63px, var(--pink) 63px, var(--pink) 84px);
      height: 7px;
    }
    @nth(58) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0px, var(--red) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--pink) 0, var(--pink) 14px, var(--yellow) 14px, var(--yellow) 42px,var(--orange) 42px, var(--orange) 70px, var(--pink) 70px, var(--pink) 84px);
      height: 7px;
    }
    @nth(59) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 0.5px, transparent calc(100% - 0.5px), var(--light-yellow) calc(100% - 0.5px)), repeating-linear-gradient(90deg, var(--light-yellow) 0, var(--light-yellow) 0.5px, transparent 0.5px, transparent 40px), repeating-linear-gradient(90deg, var(--red) 0, var(--red) 40px, var(--black) 40px, var(--black) 80px, var(--orange) 80px, var(--orange) 120px);
      height: 40px;
    }
    @nth(60) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 0.5px, transparent calc(100% - 0.5px), var(--light-yellow) calc(100% - 0.5px)), repeating-linear-gradient(90deg, var(--light-yellow) 0, var(--light-yellow) 0.5px, transparent 0.5px, transparent 40px), repeating-linear-gradient(90deg, var(--orange) 0, var(--orange) 40px, var(--red) 40px, var(--red) 80px, var(--black) 80px, var(--black) 120px);
      height: 40px;
    }
    @nth(61, 63) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0, var(--light-yellow) 0.5px, transparent 0.5px, transparent 12px),repeating-linear-gradient(90deg, var(--red), var(--red));
      height: 12px;
    }
    @nth(62) {
      background: linear-gradient(0deg, var(--light-yellow) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0, var(--light-yellow) 0.5px, transparent 0.5px, transparent 12px),repeating-linear-gradient(90deg, var(--black) 0, var(--black) 12px, var(--red) 12px, var(--red) 24px, var(--orange) 24px, var(--orange) 36px, var(--red) 36px, var(--red) 48px);
      height: 12px;
    }
    @nth(64) {
      background: radial-gradient(var(--light-yellow) 53%, transparent 57%) -8px -8px / 16px 16px, linear-gradient(0, var(--red), var(--red));
      height: 24px;
    }
    @nth(65) {
      background: var(--red);
      height: 16px;
    }
    @nth(66) {
      background: radial-gradient(var(--red) 53%, transparent 57%) -8px 0 / 16px 16px, linear-gradient(0, var(--light-yellow), var(--light-yellow));
      height: 16px;
    }
    @nth(67) {
      background: var(--light-yellow);
      height: 8px;
    }
    @nth(68) {
      background: var(--blue);
      height: 10px;
    }
    @nth(69) {
      background: var(--black);
      height: 1px;
    }
    @nth(70) {
      background: var(--blue);
      height: 3px;
    }
    @nth(71) {
      background: var(--black);
      height: 2px;
    }
    @nth(72) {
      background: var(--blue);
      height: 6px;
    }
    @nth(73) {
      background: var(--pink);
      height: 6px;
    }
    @nth(74) {
      background: var(--blue);
      height: 1px;
    }
    @nth(75, 77, 79) {
      background: var(--red);
      height: 1px;
    }
    @nth(76) {
      background: repeating-linear-gradient(90deg, var(--black) 0, var(--black) 22px, var(--red) 22px, var(--red) 23px, var(--pink) 23px, var(--pink) 45px, var(--red) 45px, var(--red) 46px, var(--black) 46px, var(--black) 68px, var(--red) 68px, var(--red) 69px, var(--black) 69px, var(--black) 91px, var(--red) 91px, var(--red) 92px);
      height: 22px;
    }
    @nth(78) {
      background: repeating-linear-gradient(90deg, var(--pink) 0, var(--pink) 22px, var(--red) 22px, var(--red) 23px, var(--light-yellow) 23px, var(--light-yellow) 45px, var(--red) 45px, var(--red) 46px, var(--black) 46px, var(--black) 68px, var(--red) 68px, var(--red) 69px, var(--light-yellow) 69px, var(--light-yellow) 91px, var(--red) 91px, var(--red) 92px);
      height: 22px;
    }
    @nth(80) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0px, var(--red) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--pink) 0, var(--pink) 28px, var(--light-yellow) 28px, var(--light-yellow) 56px, var(--black) 56px, var(--black) 84px);
      height: 7px;
    }
    @nth(81) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0px, var(--red) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--black) 0, var(--black) 7px, var(--pink) 7px, var(--pink) 35px,var(--light-yellow) 35px, var(--light-yellow) 63px, var(--black) 63px, var(--black) 84px);
      height: 7px;
    }
    @nth(82) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0px, var(--red) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--black) 0, var(--black) 14px, var(--pink) 14px, var(--pink) 42px,var(--light-yellow) 42px, var(--light-yellow) 70px, var(--black) 70px, var(--black) 84px);
      height: 7px;
    }
    @nth(83) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--red) 0px, var(--red) 0.5px, transparent 0.5px, transparent 7px), repeating-linear-gradient(90deg, var(--black) 0, var(--black) 21px, var(--pink) 21px, var(--pink) 49px,var(--light-yellow) 49px, var(--light-yellow) 77px, var(--black) 77px, var(--black) 84px);
      height: 7px;
    }
    @nth(84) {
      background: linear-gradient(0deg, var(--red) 0.5px, transparent 1px, transparent), repeating-linear-gradient(90deg, var(--light-yellow) 0, var(--light-yellow) 12px, var(--red) 12px, var(--red) 12.5px);
      height: 12px;
    }
    @nth(85, 87, 89, 91, 93, 95) {
      height: 4px;
    }
    @nth(86, 92, 94) {
      background: radial-gradient(var(--pink) 43%, transparent 48%) 0 0 / 8px 8px;
      height: 24px;
    }
    @nth(88, 92) {
      background: var(--black);
      height: 1px;
      opacity: 0.3;
    }
    @nth(90) {
      background: radial-gradient(var(--pink) 43%, transparent 48%) 0 0 / 8px 8px;
      height: 8px;
    }
    @nth(96) {
      background: repeating-linear-gradient(90deg, var(--dark-blue) 0, var(--dark-blue) 14px, var(--red) 14px, var(--red) 28px);
      height: 14px;
    }
    @nth(97) {
      background: repeating-linear-gradient(90deg, var(--red) 0, var(--red) 14px, var(--dark-blue) 14px, var(--dark-blue) 28px);
      height: 6px;
    }
    @nth(98) {
      background: var(--pink);
      height: 2px;
    }
    @nth(99, 101) {
      background: radial-gradient(var(--light-yellow) 62%, transparent 66%) -18px 0 / 36px 36px, linear-gradient(0deg, var(--pink), var(--pink));
      height: 36px;
    }
    @nth(100, 102) {
      background: radial-gradient(var(--light-yellow) 62%, transparent 66%) 0 0 / 36px 36px, linear-gradient(0deg, var(--pink), var(--pink));
      height: 36px;
    }
    @nth(103, 104, 105) {
      background: linear-gradient(180deg, var(--yellow) 0.5px, transparent 0.5px), repeating-linear-gradient(90deg, var(--yellow) 0, var(--yellow) 0.5px, transparent 0.5px, transparent 6px), linear-gradient(90deg, var(--red), var(--red));
      height: 6px;
    }
    @nth(106) {
      background: repeating-linear-gradient(90deg, var(--yellow) 0, var(--yellow) 16px, var(--red) 16px, var(--red) 32px);
      height: 12px;
    }
    @nth(107) {
      background: var(--blue);
      height: 10px;
    }
    @nth(108) {
      background: var(--yellow);
      height: 4px;
    }
    @nth(109) {
      background: var(--dark-blue);
      height: 1px;
    }
    @nth(110) {
      background: var(--yellow);
      height: 7px;
    }
    @nth(111) {
      background: var(--black);
      height: 2px;
    }
    @nth(112) {
      background: var(--yellow);
      height: 4px;
    }
    @nth(113) {
      background: var(--light-yellow);
      height: 3px;
    }
    @nth(114) {
      background: var(--red);
      height: 3px;
    }
    @nth(115) {
      background: var(--light-yellow);
      height: 4px;
    }
    @nth(116, 118, 120) {
      background: var(--yellow);
      height: 2px;
    }
    @nth(117, 119, 121) {
      background: var(--light-yellow);
      height: 2px;
    }
    @nth(122) {
      background: var(--pink);
      height: 4px;
    }
    @nth(123) {
      height: 2px;
    }
    @nth(124) {
      background: var(--blue);
      height: 2px;
    }
    @nth(125) {
      height: 6px;
    }
    @nth(126) {
      background: var(--blue);
      height: 4px;
    }
  </css-doodle>
  `
  const { ref, scale, inView } = useDoodle(size, { update: false })

  return (
    <div ref={ref} className="my-16">
      <div
        className="mx-auto mb-2"
        style={{
          width: size * scale,
          height: height * scale,
        }}
      >
        {inView && (
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
            style={{
              width: size,
              height: size,
              transform: `scale(${scale})`,
            }}
            className="origin-top-left"
          />
        )}
      </div>
      <Link href="https://codepen.io/aragakey/full/jOMBEWZ">
        Can Do One-div If Not Animated
      </Link>
    </div>
  )
}

export default Gen
