import { FunctionComponent, SVGProps } from 'react'

const Icon: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5986 3C13.4684 3 13.3476 3.02798 13.236 3.06528C13.4731 3.22382 13.6033 3.43365 13.6683 3.67146C13.673 3.7041 13.6823 3.72742 13.6869 3.76006C13.6916 3.78803 13.6962 3.81601 13.6962 3.84399C13.7148 4.25433 13.5893 4.30562 13.501 4.54809C13.3662 4.86051 13.4034 5.19624 13.5661 5.46669C13.58 5.49933 13.5986 5.53663 13.6219 5.56927C13.4452 4.38955 14.426 4.21236 14.6073 3.84399C14.6213 3.52225 14.3563 3.30775 14.1471 3.15854C13.9472 3.0373 13.766 3 13.5986 3ZM15.0768 3.26579C15.0582 3.37303 15.0722 3.34506 15.0675 3.40101C15.0629 3.43831 15.0629 3.48495 15.0583 3.52225C15.049 3.55955 15.0397 3.59685 15.0257 3.63416C15.0164 3.67146 15.0025 3.70877 14.9885 3.74607C14.9699 3.78337 14.956 3.81601 14.9374 3.85332C14.9235 3.87197 14.9142 3.89062 14.9002 3.90927C14.8909 3.92326 14.8816 3.93725 14.8723 3.95124C14.8491 3.98388 14.8258 4.01652 14.8026 4.0445C14.7747 4.07247 14.7515 4.10511 14.7189 4.12843V4.1331C14.691 4.15641 14.6631 4.18439 14.6306 4.2077C14.533 4.28231 14.4214 4.33827 14.3191 4.40821C14.2866 4.43152 14.2541 4.45018 14.2262 4.47815C14.1936 4.50147 14.1657 4.52478 14.1379 4.55276C14.1053 4.58074 14.0821 4.60872 14.0542 4.64136C14.0309 4.66934 14.003 4.70197 13.9844 4.73462C13.9612 4.76726 13.938 4.7999 13.9194 4.83254C13.9008 4.86984 13.8868 4.90248 13.8682 4.93978C13.8543 4.97709 13.8403 5.00973 13.831 5.04703C13.8171 5.089 13.8078 5.1263 13.7985 5.16361C13.7939 5.18226 13.7939 5.20557 13.7892 5.22422C13.7846 5.24288 13.7846 5.26153 13.7799 5.28018C13.7799 5.31748 13.7753 5.35945 13.7753 5.39675C13.7753 5.42473 13.7753 5.45271 13.7799 5.48068C13.7799 5.51799 13.7846 5.55529 13.7939 5.59726C13.7985 5.63456 13.8078 5.67186 13.8171 5.70917C13.8311 5.74647 13.8404 5.78377 13.8543 5.82108C13.8636 5.84439 13.8775 5.86771 13.8868 5.88636L12.8177 5.47136C12.6364 5.42006 12.4597 5.37344 12.2785 5.33147C12.1808 5.30816 12.0832 5.28484 11.9856 5.26153C11.7067 5.20557 11.4231 5.16361 11.1396 5.13563C11.1303 5.13563 11.1256 5.13096 11.1163 5.13096C10.8374 5.10298 10.5631 5.08899 10.2842 5.08899C10.0797 5.08899 9.87516 5.09831 9.67528 5.11231C9.39172 5.13097 9.10816 5.16826 8.8246 5.21489C8.75487 5.22421 8.68514 5.23821 8.61541 5.2522C8.47131 5.28017 8.33185 5.31281 8.19705 5.34545C8.12732 5.36411 8.05759 5.38276 7.98786 5.40141C7.91814 5.42938 7.85306 5.46203 7.78797 5.49C7.73684 5.51332 7.68571 5.53663 7.63457 5.55995C7.62528 5.56462 7.61597 5.56462 7.61133 5.56927C7.56485 5.59258 7.52301 5.61123 7.48117 5.63455C7.46723 5.63922 7.45793 5.64387 7.44863 5.64854C7.3975 5.67185 7.34637 5.69983 7.30453 5.72314C7.27199 5.73713 7.23945 5.75578 7.21156 5.76977C7.19761 5.77909 7.17902 5.78843 7.16972 5.79309C7.12789 5.8164 7.08605 5.83972 7.04886 5.86303C7.00702 5.88635 6.96984 5.90966 6.93729 5.93297C6.90476 5.95629 6.87222 5.97494 6.84432 5.99825C6.83967 6.00292 6.83503 6.00292 6.83038 6.00757C6.80249 6.02623 6.76995 6.04954 6.74206 6.07286C6.74206 6.07286 6.7374 6.07752 6.73277 6.08217C6.70953 6.10083 6.68628 6.11948 6.66304 6.13813C6.65375 6.1428 6.64444 6.15212 6.63515 6.15679C6.61191 6.17545 6.58866 6.19875 6.56542 6.21741C6.56077 6.22673 6.55148 6.2314 6.54682 6.23607C6.51893 6.26404 6.49104 6.28736 6.46315 6.31534C6.45849 6.31534 6.45849 6.32 6.45386 6.32465C6.42596 6.34797 6.39807 6.37595 6.37018 6.40392C6.36553 6.40859 6.36553 6.41324 6.36089 6.41324C6.33765 6.43656 6.31441 6.45987 6.29116 6.48785C6.28187 6.49717 6.26792 6.50651 6.25863 6.51582C6.23538 6.5438 6.20749 6.57178 6.1796 6.59976C6.17494 6.60908 6.16566 6.61375 6.161 6.62307C6.12381 6.66038 6.09127 6.69768 6.05408 6.73498C6.04943 6.73965 6.04479 6.7443 6.04014 6.74897C5.96576 6.82824 5.88673 6.90751 5.80306 6.97746C5.71939 7.05206 5.63107 7.12201 5.54274 7.18262C5.44977 7.24791 5.36145 7.30386 5.26383 7.35982C5.17086 7.41111 5.07324 7.45774 4.97098 7.4997C4.87336 7.54167 4.77109 7.57897 4.66882 7.61161C4.47358 7.65358 4.2737 7.73285 4.1017 7.74684C4.06451 7.74684 4.02268 7.75616 3.98549 7.76083C3.94365 7.77014 3.90646 7.77949 3.86928 7.78881C3.83209 7.80279 3.7949 7.81678 3.75771 7.83077C3.72052 7.84476 3.68333 7.86341 3.64615 7.88206C3.61361 7.90538 3.57642 7.92403 3.54388 7.94734C3.51134 7.97066 3.4788 7.99863 3.45091 8.02661C3.41837 8.04993 3.38583 8.08257 3.35794 8.11055C3.33004 8.14319 3.30215 8.17117 3.27891 8.2038C3.25567 8.24111 3.22778 8.27375 3.20918 8.31105C3.18594 8.34369 3.1627 8.381 3.1441 8.4183C3.1255 8.46027 3.10692 8.49757 3.09297 8.53954C3.07902 8.57684 3.06508 8.61881 3.05113 8.66077C3.04184 8.69808 3.03253 8.73538 3.02789 8.77268C3.02789 8.77736 3.02324 8.782 3.02324 8.78667C3.01395 8.82864 3.01395 8.88459 3.00929 8.91257C3.00463 8.94521 3 8.97319 3 9.00583C3 9.02449 3 9.0478 3.00466 9.06645C3.00931 9.09909 3.01395 9.12707 3.02326 9.15505C3.03255 9.18302 3.04186 9.211 3.0558 9.23898V9.24365C3.06974 9.27163 3.08834 9.2996 3.10693 9.32758C3.12553 9.35556 3.14412 9.38354 3.16736 9.41151C3.1906 9.43483 3.21849 9.4628 3.24639 9.48612C3.27428 9.5141 3.30217 9.53741 3.33471 9.56072C3.44627 9.65865 3.47416 9.69129 3.61827 9.76589C3.64151 9.77988 3.66475 9.78921 3.69265 9.8032C3.6973 9.8032 3.70194 9.80787 3.70659 9.80787C3.70659 9.81718 3.70659 9.82186 3.71125 9.83118C3.7159 9.86849 3.72519 9.90579 3.73449 9.94309C3.74378 9.98506 3.75773 10.0224 3.77168 10.055C3.78563 10.083 3.79492 10.111 3.80887 10.1389C3.81352 10.1483 3.81816 10.1576 3.82281 10.1623C3.84141 10.1996 3.86 10.2322 3.87859 10.2648C3.90184 10.2975 3.92508 10.3301 3.94832 10.3628C3.97156 10.3907 3.99946 10.4234 4.02735 10.4514C4.05524 10.4793 4.08313 10.5026 4.11567 10.5306C4.11567 10.5306 4.12033 10.5353 4.12496 10.5353C4.15285 10.5586 4.18074 10.5819 4.20863 10.6006C4.24117 10.6239 4.27371 10.6425 4.3109 10.6612C4.34344 10.6799 4.38063 10.6985 4.41782 10.7125C4.44571 10.7265 4.47825 10.7358 4.51079 10.7451C4.51544 10.7498 4.52008 10.7498 4.52939 10.7544C4.54799 10.7591 4.57122 10.7638 4.58982 10.7684C4.57587 11.0202 4.57122 11.258 4.60842 11.342C4.65026 11.4352 4.85479 11.1508 5.05933 10.8244C5.03144 11.1461 5.01284 11.5238 5.05933 11.6357C5.11046 11.7523 5.38937 11.3886 5.6311 10.9876C8.9269 10.2229 11.9345 12.5077 12.2506 15.7345C12.1902 15.2309 11.5719 14.9511 11.2884 15.021C11.1489 15.3661 10.9118 15.8091 10.5306 16.0842C10.5632 15.7764 10.5492 15.4593 10.4842 15.1516C10.3819 15.5806 10.182 15.9816 9.90774 16.3266C9.46613 16.3593 9.02452 16.1448 8.79209 15.823C8.77349 15.8091 8.76885 15.7811 8.75491 15.7624C8.74096 15.7298 8.72701 15.6972 8.71772 15.6645C8.70377 15.6319 8.69448 15.5992 8.68983 15.5666C8.68517 15.5339 8.68517 15.5013 8.68517 15.464C8.68517 15.4407 8.68517 15.4174 8.68517 15.3941C8.68983 15.3614 8.69912 15.3288 8.70841 15.2961C8.7177 15.2635 8.72701 15.2309 8.74095 15.1982C8.75955 15.1656 8.77349 15.1329 8.79674 15.1003C8.87576 14.8765 8.87576 14.6946 8.73166 14.5874C8.70376 14.5687 8.67587 14.5547 8.64333 14.5407C8.62473 14.5361 8.6015 14.5268 8.5829 14.5221C8.56896 14.5174 8.55966 14.5128 8.54572 14.5081C8.51317 14.4988 8.48063 14.4894 8.4481 14.4848C8.41555 14.4755 8.38302 14.4708 8.35048 14.4708C8.31794 14.4661 8.28075 14.4615 8.24821 14.4615C8.22497 14.4615 8.20172 14.4661 8.17848 14.4661C8.14129 14.4661 8.10875 14.4708 8.07621 14.4801C8.04367 14.4848 8.01113 14.4894 7.97859 14.4988C7.94606 14.5081 7.91351 14.5174 7.88097 14.5314C7.84844 14.5454 7.82054 14.5594 7.788 14.5734C7.76011 14.5874 7.73222 14.606 7.69968 14.62C6.61657 15.3288 7.26272 16.9888 8.00184 17.4691C7.72292 17.5204 7.43937 17.581 7.36034 17.6416C7.35568 17.6463 7.35105 17.6509 7.35105 17.6509C7.55094 17.7722 7.76012 17.8747 7.9786 17.9633C8.27611 18.0613 8.59221 18.1499 8.73166 18.1872V18.1918C9.11749 18.2711 9.50797 18.2991 9.90309 18.2758C11.9624 18.1312 13.6498 16.5598 13.9566 14.4895C13.9659 14.5314 13.9752 14.5687 13.9845 14.6107C13.9984 14.6946 14.017 14.7832 14.0263 14.8718V14.8765C14.0356 14.9185 14.0403 14.9604 14.0449 14.9977V15.0164C14.0496 15.0584 14.0542 15.1003 14.0542 15.1376C14.0589 15.1889 14.0635 15.2402 14.0635 15.2915V15.3661C14.0635 15.3894 14.0682 15.4174 14.0682 15.4407C14.0682 15.4687 14.0635 15.4967 14.0635 15.5247V15.5899C14.0635 15.6226 14.0589 15.6506 14.0589 15.6832C14.0589 15.7018 14.0589 15.7205 14.0542 15.7438C14.0542 15.7765 14.0495 15.8091 14.0495 15.8464C14.0449 15.8604 14.0449 15.8744 14.0449 15.8884C14.0402 15.9257 14.0356 15.9583 14.0309 15.9956C14.0309 16.0096 14.0309 16.0236 14.0263 16.0376C14.0216 16.0842 14.0123 16.1262 14.0077 16.1728V16.1775V16.1821C13.9984 16.2241 13.9891 16.2707 13.9798 16.3127V16.3267C13.9705 16.3687 13.9612 16.4106 13.9519 16.4526C13.9519 16.4573 13.9472 16.4666 13.9472 16.4712C13.938 16.5132 13.9286 16.5552 13.9147 16.5972V16.6111C13.9008 16.6578 13.8868 16.6997 13.8775 16.7417C13.8729 16.7464 13.8729 16.751 13.8729 16.751C13.8589 16.7976 13.845 16.8443 13.831 16.8909C13.8124 16.9375 13.7985 16.9795 13.7799 17.0261C13.7613 17.0728 13.7474 17.1194 13.7288 17.1614C13.7102 17.208 13.6916 17.25 13.673 17.2966H13.6683C13.6497 17.3385 13.6311 17.3852 13.6079 17.4271C13.6032 17.4411 13.5986 17.4505 13.5939 17.4598C13.5893 17.4645 13.5893 17.4691 13.5847 17.4738C13.2825 18.0846 12.8362 18.6209 12.2784 19.0405C12.2412 19.0638 12.204 19.0918 12.1669 19.1198C12.1576 19.1291 12.1436 19.1338 12.1343 19.1431C12.1018 19.1664 12.0692 19.1897 12.032 19.213L12.046 19.241H12.0506C12.1157 19.2317 12.1808 19.2224 12.2459 19.213H12.2505C12.3714 19.1944 12.4923 19.1711 12.6131 19.1478C12.6457 19.1431 12.6829 19.1338 12.7154 19.1244C12.7386 19.1198 12.7572 19.1151 12.7805 19.1105C12.813 19.1058 12.8455 19.0965 12.8781 19.0918C12.906 19.0825 12.9339 19.0778 12.9618 19.0685C13.4266 18.9566 13.8775 18.8027 14.3098 18.6208C13.5707 19.6327 12.5806 20.4487 11.4231 20.9849C11.9577 20.9476 12.4923 20.859 13.0082 20.7098C14.8816 20.1549 16.4575 18.8913 17.4011 17.1893C17.2105 18.2665 16.7829 19.2923 16.1507 20.1876C16.6016 19.8892 17.0153 19.5441 17.3918 19.1524C18.4331 18.0613 19.1164 16.6764 19.3488 15.1889C19.5069 15.9257 19.5534 16.6857 19.4836 17.4365C22.8399 12.7409 19.7626 7.8728 18.4749 6.59049C18.4703 6.58118 18.4656 6.57651 18.4656 6.56718C18.461 6.57185 18.461 6.57185 18.461 6.5765C18.461 6.57183 18.461 6.57183 18.4563 6.56718C18.4563 6.62314 18.4517 6.67909 18.447 6.73504C18.4331 6.84229 18.4191 6.94488 18.4005 7.04746C18.3773 7.15005 18.3494 7.25263 18.3215 7.35521C18.289 7.45313 18.2518 7.55572 18.2099 7.65364C18.1681 7.7469 18.1216 7.84482 18.0705 7.93808C18.0194 8.02668 17.9636 8.11993 17.9031 8.20387C17.8427 8.29246 17.7776 8.37639 17.7126 8.45566C17.6428 8.5396 17.5684 8.6142 17.4941 8.68881C17.4476 8.73078 17.4057 8.76808 17.3593 8.80538C17.3221 8.83802 17.2895 8.866 17.2523 8.89864C17.1687 8.96392 17.085 9.02454 16.992 9.0805C16.9037 9.13645 16.8107 9.19241 16.7178 9.23904C16.6201 9.28567 16.5225 9.32763 16.4249 9.3696C16.3273 9.4069 16.225 9.43954 16.1228 9.46752C16.0205 9.4955 15.9136 9.51881 15.8113 9.53746C15.7044 9.55612 15.5975 9.56544 15.4952 9.57477C15.4208 9.57944 15.3465 9.58409 15.2721 9.58409C15.1652 9.58409 15.0582 9.57477 14.956 9.56543C14.8491 9.55611 14.7421 9.54211 14.6399 9.5188C14.533 9.50014 14.4307 9.47217 14.3284 9.43953H14.3238C14.426 9.43021 14.5283 9.42087 14.6306 9.40222C14.7375 9.38356 14.8398 9.36026 14.942 9.33228C15.0443 9.3043 15.1466 9.27166 15.2442 9.23436C15.3464 9.19705 15.4441 9.15043 15.537 9.10379C15.6347 9.05716 15.723 9.00587 15.8159 8.94992C15.9043 8.8893 15.9926 8.82868 16.0763 8.7634C16.1599 8.69812 16.239 8.62818 16.3133 8.55357C16.3924 8.48363 16.4621 8.40436 16.5318 8.32509C16.6015 8.24116 16.6666 8.15722 16.7271 8.07329C16.7363 8.0593 16.7457 8.04065 16.755 8.02666C16.8014 7.95205 16.8479 7.87745 16.8898 7.80284C16.9409 7.70958 16.9874 7.61632 17.0292 7.5184C17.071 7.42048 17.1082 7.32256 17.1408 7.21997C17.1733 7.12205 17.1966 7.01947 17.2198 6.91688C17.2384 6.80964 17.257 6.70705 17.2663 6.60447C17.2756 6.49722 17.2849 6.38997 17.2849 6.28739C17.2849 6.21278 17.2802 6.13818 17.2756 6.06357C17.2663 5.95632 17.2524 5.85374 17.2384 5.75115C17.2198 5.64391 17.1966 5.54132 17.1687 5.43874C17.1361 5.34082 17.1036 5.23823 17.0664 5.14031C17.0292 5.04239 16.9827 4.94447 16.9363 4.85121C16.8851 4.75795 16.834 4.66469 16.7782 4.5761C16.7178 4.4875 16.6573 4.40357 16.5923 4.31963C16.5225 4.24036 16.4528 4.16109 16.3784 4.08183C16.3412 4.04452 16.2994 4.00256 16.2576 3.96525C16.0484 3.80205 15.8299 3.64817 15.6114 3.50829C15.5789 3.48963 15.551 3.47564 15.5185 3.46165C15.3651 3.36373 15.2209 3.31241 15.0768 3.26579Z"
    />
  </svg>
)

export default Icon