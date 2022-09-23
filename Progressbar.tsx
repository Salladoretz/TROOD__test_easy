import React from 'react'

export type ProgressbarProps = {
    items:
    {
        name: string,
        color: string,
        value: number
    }[],
    height: number,
    width: number
}

const Progressbar: React.FC<ProgressbarProps> = ({ items, height, width }) => {

    const total = items.reduce((acc, item) => acc + item.value, 0)

    const progress = items.map(item => {

        let share = item.value / total * 100
        let bars = Math.round(share * width / 100)

        return {
            ...item,
            share: share,
            bars: bars
        }
    })

    return (
        <div style={{
            display: 'flex',
            height: 'fit-content',
            gap: 5
        }}>
            {width >= 1
                ? progress.map((item, index) =>
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                            {Array(item.bars).fill(
                                <div
                                    style={{
                                        height: height,
                                        width: 5,
                                        borderRadius: 3,
                                        background: item.color
                                    }}
                                ></div>)}
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: 2,
                            paddingTop: 5,
                            alignItems: 'center',
                            color: item.color
                        }}>
                            <div style={{
                                height: 10,
                                width: 10,
                                borderRadius: '50%',
                                background: item.color
                            }}></div>
                            {item.name}: {item.value} ({item.share.toFixed(2)}%)
                        </div>
                    </div>)
                : ''}
        </div>
    )
}

export default Progressbar