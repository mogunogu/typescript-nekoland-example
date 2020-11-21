// 서버 선언파일 참조
///<reference path="../../declation/Server.d.ts" />

import config from './config/config';


try {
    Server.damageCallback = (a, b, _skillId, critical, visible) => {
        // 데미지 계산 (공격자의 공격력 - 방어자의 방어력)
        let damage = a.atk - b.def;
        // 데미지가 0일경우 데미지 표시를 출력하지 않음
        if ( damage <= 0 ) {
            visible = false;
        }
        damage += a.GetVar(config.UNIT_CUSTOM_VAR);
        // 데미지, 크리 여부, 폰트 출력 여부
        return [damage, critical, visible];
    };
} catch (error) {
    print(error);
}

