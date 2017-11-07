import { tstampToShortStr, durationInMinutes } from './../utils'

describe('time-utils unit tests', () => {
    
        it('right format test', () => {
            expect(tstampToShortStr(1370001284000)).toBe('05 31st 13, 2:54')
        })

        it('duration less than 1 min', () => {
            expect(durationInMinutes(57)).toBe('00:00:57')
        })

        it('duration more than 1 min', () => {
            expect(durationInMinutes(67)).toBe('00:01:07')
        })

        it('duration more than 1 hour', () => {
            expect(durationInMinutes(4667)).toBe('01:17:47')
        })
    })