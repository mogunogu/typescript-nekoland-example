/** @noSelfInFile */

declare interface sayCallback {
    (player: ServerScript.ScriptRoomPlayer, text: string): boolean
}

/** @tupleReturn */
declare interface damageCallbackFunction {
    (attaker: ServerScript.ScriptUnit, defender: ServerScript.ScriptUnit,
        skillDataID: number, critical: boolean, visible: boolean): [number, boolean, boolean];
}

declare interface onAddItemFunction {
    (unit: ServerScript.ScriptUnit, item: network.TItem): void
}

declare interface onGetTopicFunction {
    (): void
}


declare namespace network {

    /**
     * 케릭터의 데이터베이스 정보
    */
    abstract class TGameCharacter {
        /**
         * 케릭터의 이름
        */
        name: string
    }

    
    /**
     * 아이템 클래스
    */
    interface TItem {

    }
}



declare namespace ServerScript {
    
    /**
    * 스크립팅 오브젝트의 기본 클래스입니다.
    * 커스텀 데이터 수정이 가능합니다 (몬스터 AI 의 스크립팅 중 ai.customData.test = 1 와 같이 커스텀 변수의 사용이 가능합니다)
    */
    interface ScriptObject {
        /**
         * 커스텀 데이터
         */
        customData: object
    }

    /**
    * 게임 서버를 스크립트로 조작할 수 있게 해주는 서버 클래스입니다.
    */
    interface ScriptServer {

        onAddItem: onAddItem

        HttpPOST(url:string, data:object, func: Function): void

        RunLater(func: Function, time: number): void


        GetTopic(topic: string) : onGetTopic

        damageCallback: damageCallbackFunction
    }

    /**
    * 여러 유틸리티 함수가 있는 스크립트 클래스입니다
    */
    interface ScriptUtility {
        /**
         * JSON 파일을 파싱하여 결과를 반환합니다
         */
        JSONParse(json: string): object

    }
    /**
    * 서버에서 한 게임 유저에 대응하는 클래스입니다. 해당 플레이어의 정보를 가져오거나, 설정할 수 있습니다
    */
    interface ScriptRoomPlayer extends ScriptObject {
        /**
         * 현재 플레이어의 레벨의 하나 전 레벨까지 필요한 총 경험치량
         */
        baseEXP: number

        /**
         * 플레이어의 고유 ID
         */
        id: number
    }

    /**
    * 루아 스크립트 상의 함수를 이벤트 등록에 사용 가능하게 해주는 클래스입니다
    */
    interface ScriptEventPublisher {
        /**
        * 이 이벤트가 발생했을 때, 호출할 루아 함수를 등록합니다
        */
        Add(func: Function): void
    }

    /**
    * 아이템이 추가되었을 때 호출되는 이벤트입니다
    */
    interface onAddItem extends ScriptEventPublisher {
        /**
        * 이 이벤트가 발생했을 때, 호출할 루아 함수를 등록합니다
        */
        Add(func: onAddItemFunction): void
    }
    
    /**
    * 클라이언트로부터 메세지를 받았을때의 이벤트입니다
    */
   interface onGetTopic extends ScriptEventPublisher {
    /**
    * 이 이벤트가 발생했을 때, 호출할 루아 함수를 등록합니다
    */
    Add(func: onGetTopicFunction): void
}


    /**
     * 하나의 유닛에 대응하는 클래스입니다. 유닛의 정보를 가져오거나 설정할 수 있습니다
     * @noSelf
    */
    interface ScriptUnit extends ScriptObject {
        /**
         * 유닛의 민첩 스탯
         */
        agi: number
        /**
         * 유닛의 민첩 스탯
         */
        agility: number
        /**
         * 유닛의 공격력 스탯
         */
        atk: number

        /**
         * 유닛의 공격력 스탯
         */
        attack: number
        

        /**
         * 유닛의 버프를 ScriptUnitBuff 형식으로 얻어옵니다
         */
        buffs: Array<ScriptUnitBuff>

        /**
         * 유닛의 데이터를 TGameCharacter 형식으로 얻어옵니다
         */
        characterData: network.TGameCharacter

        /**
         * 유닛의 캐릭터 ID
         */
        characterID: number

        /**
         * 플레이어 유닛의 누적 경험치
         */
        cumulativeEXP: number

        /**
         * 유닛의 방어력 스탯
         */
        def: number

        /**
         * 유닛의 방어력 스탯
         */
        defense: number

        /**
         * 유닛의 X 방향 좌표
         */
        dirX: number

        /**
         * 유닛의 Y 방향 좌표
         */
        dirY: number

        /**
         * 플레이어 유닛의 현재 경험치
         */
        exp: number

        /**
         * 유닛의 현재 피로도
         */
        fatigue: number

        /**
         * 이 유닛이 접속해 있는 필드의 객체 (ScriptField) 
         */
        field: ScriptField


        /**
         * 유닛이 가진 골드 (이 유닛이 플레이어 유닛일 경우에만 동작합니다)
         */
        gameMoney : number

        /**
         * 유닛의 현재 체력
         */
        hp: number

        /**
         * 유닛의 고유 ID
         */
        id: number

        /**
         * 이 몬스터 유닛이 처음 접속한 맵(필드)의 ScriptField 객체
         */
        initField : ScriptField

        /**
         * 이 플레이어가 게임 관리자(마스터)인지 반환합니다
         */
        isGM: boolean

        /**
         * 유닛의 직업
         */
        job: number

        /**
         * 유닛의 레벨
         */
        level: number

        /**
         * 유닛의 행운 스탯
         */
        lucky: number

        /**
         * 유닛의 마법 공격력 스탯
         */
        magicAtk: number

        /**
         * 유닛의 마법 공격력 스탯
         */
        magicAttack: number

        /**
         * 유닛의 마법 방어력 스탯
         */
        magicDef: number

        /**
         * 유닛의 마법 방어력 스탯
         */
        magicDefense: number


        /**
         * 클라이언트에게 Topic에 대한 이벤트를 보냅니다
         */
        FireEvent(topic: string, ...args: any[]): void

        /**
         * 해당 유닛에 상태를 추가합니다
         */
        AddBuff (buffID: number, ScriptUnit? :ScriptUnit): void

        /**
         * 이 유닛에게 피해(데미지)를 입힙니다
         * (단 몬스터 대상으로 해당 함수를 사용시 공격자를 판별할 수 없으므로 보상이 지급되지 않습니다)
         */
        AddDamage (damage: number, skillDataID?: number, critical?: boolean): void

        /**
         * 이 유닛에게 피해(데미지)를 입힙니다
         * (이 함수에서는 공격자를 판별할 수 있으므로 몬스터 대상 공격 시 보상이 지급됩니다)
         */
        AddDamageBy (ScriptUnit :ScriptUnit, damage: number, skillDataID?: number, critical?: boolean): void

        /**
         * 유닛에게 경험치를 지급합니다 (플레이어 유닛일 경우에만 동작합니다)
        */
        AddEXP (amount: number): void

        /**
         * 플레이어 유닛의 변수 값을 가져옵니다
        */
        GetVar (id: number): number



    }

    interface ScriptUnitBuff {

    }

    /**
     * 서버에서 필드를 관리하는 객체입니다. 하나의 필드에 대응합니다
     */
    interface ScriptField {
        /**
         * 해당 필드에 있는 모든 유닛을 배열 형식으로 가져옵니다
         */
        units: Array<ScriptUnit | null>
    }


}




declare var Server: ServerScript.ScriptServer


declare var Utility: ServerScript.ScriptUtility


