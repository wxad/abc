import DemoBox from "../DemoBox"
import HoverFill from "./HoverFill"

const Demo = () => (
  <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm">
    <div className="flex items-center justify-center w-full">
      <div>
        <div className="flex h-11 text-xs text-neutral-500">
          <div className="flex items-center w-[78px] pl-2">指数名称</div>
          <div className="flex justify-center items-center w-[70px]">
            指数值
          </div>
          <div className="flex justify-center items-center w-[70px]">
            30天环比
          </div>
          <div className="flex justify-center items-center w-[70px]">
            行业均值
          </div>
          <div className="flex justify-end items-center pr-2 w-[77px]">
            行业排名
          </div>
        </div>
        <HoverFill bgClassName="rounded-sm">
          <div className="flex h-11 text-sm group">
            <div className="flex items-center w-[78px] pl-2 group-hover:text-[#296BEF] group-hover:font-semibold transition-colors duration-150">
              社交指数
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#296BEF] group-hover:font-medium transition-colors duration-150">
              92.5
            </div>
            <div className="flex justify-center items-center w-[70px]">
              +0.5%
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#10AEFF] group-hover:font-semibold transition-colors duration-150">
              80
            </div>
            <div className="flex justify-end items-center pr-2 w-[77px]">
              前0.5%
            </div>
          </div>
        </HoverFill>
        <HoverFill bgClassName="rounded-sm">
          <div className="flex h-11 text-sm group">
            <div className="flex items-center w-[78px] pl-2 group-hover:text-[#296BEF] group-hover:font-semibold transition-colors duration-150">
              互动指数
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#296BEF] group-hover:font-medium transition-colors duration-150">
              84.2
            </div>
            <div className="flex justify-center items-center w-[70px]">
              -1.1%
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#10AEFF] group-hover:font-semibold transition-colors duration-150">
              80
            </div>
            <div className="flex justify-end items-center pr-2 w-[77px]">
              前50%
            </div>
          </div>
        </HoverFill>
        <HoverFill bgClassName="rounded-sm">
          <div className="flex h-11 text-sm group">
            <div className="flex items-center w-[78px] pl-2 group-hover:text-[#296BEF] group-hover:font-semibold transition-colors duration-150">
              合作指数
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#296BEF] group-hover:font-medium transition-colors duration-150">
              80.2
            </div>
            <div className="flex justify-center items-center w-[70px]">
              +3.4%
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#10AEFF] group-hover:font-semibold transition-colors duration-150">
              70
            </div>
            <div className="flex justify-end items-center pr-2 w-[77px]">
              前10%
            </div>
          </div>
        </HoverFill>
        <HoverFill bgClassName="rounded-sm">
          <div className="flex h-11 text-sm group">
            <div className="flex items-center w-[78px] pl-2 group-hover:text-[#296BEF] group-hover:font-semibold transition-colors duration-150">
              性价比指数
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#296BEF] group-hover:font-medium transition-colors duration-150">
              92.5
            </div>
            <div className="flex justify-center items-center w-[70px]">
              +0.5%
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#10AEFF] group-hover:font-semibold transition-colors duration-150">
              80
            </div>
            <div className="flex justify-end items-center pr-2 w-[77px]">
              低于50%
            </div>
          </div>
        </HoverFill>
        <HoverFill bgClassName="rounded-sm">
          <div className="flex h-11 text-sm group">
            <div className="flex items-center w-[78px] pl-2 group-hover:text-[#296BEF] group-hover:font-semibold transition-colors duration-150">
              成长指数
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#296BEF] group-hover:font-medium transition-colors duration-150">
              92.5
            </div>
            <div className="flex justify-center items-center w-[70px]">
              +0.5%
            </div>
            <div className="flex justify-center items-center w-[70px] group-hover:text-[#10AEFF] group-hover:font-semibold transition-colors duration-150">
              80
            </div>
            <div className="flex justify-end items-center pr-2 w-[77px]">
              低于50%
            </div>
          </div>
        </HoverFill>
      </div>
    </div>
  </DemoBox>
)

export default Demo
